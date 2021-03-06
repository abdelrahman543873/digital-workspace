import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { Team, TeamDocument } from './schema/team.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateTeamInput } from './inputs/create-team.input';
import { AddTeamMemberInput } from './inputs/manage-team-member.input';
import { MyTeamsInput } from './inputs/get-my-teams.input';
import { UpdateTeamInput } from './inputs/update-team.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteTeamInput } from './inputs/delete-team.input';

@Injectable()
export class TeamRepository extends BaseRepository<Team> {
  constructor(
    @InjectModel(Team.name)
    private teamSchema: AggregatePaginateModel<TeamDocument>,
  ) {
    super(teamSchema);
  }

  async createTeam(userId: ObjectId, input: CreateTeamInput) {
    return await this.teamSchema.create({ admin: userId, ...input });
  }

  getTeamsList(input: Pagination) {
    const aggregation = this.teamSchema.aggregate([
      {
        $match: {},
      },
      {
        $addFields: {
          membersCount: { $size: '$members' },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.teamSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateTeam(input: UpdateTeamInput) {
    return this.teamSchema.findOneAndUpdate(
      {
        _id: new Types.ObjectId(input.id),
      },
      input,
      { new: true },
    );
  }

  async manageTeamMember(userId: ObjectId, input: AddTeamMemberInput) {
    await this.teamSchema.updateOne(
      { admin: userId, _id: new Types.ObjectId(input.teamId) },
      [
        {
          $set: {
            members: {
              $cond: [
                {
                  $in: [new Types.ObjectId(input.memberId), '$members'],
                },
                {
                  $setDifference: [
                    '$members',
                    [new Types.ObjectId(input.memberId)],
                  ],
                },
                {
                  $concatArrays: [
                    '$members',
                    [new Types.ObjectId(input.memberId)],
                  ],
                },
              ],
            },
          },
        },
      ],
    );
    return await this.teamSchema.findOne({
      admin: userId,
      _id: new Types.ObjectId(input.teamId),
    });
  }

  async getMyTeams(userId: ObjectId, input: MyTeamsInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    const aggregation = this.teamSchema.aggregate([
      {
        $match: {
          $expr: {
            $or: [
              { $in: [chosenId, '$members'] },
              { $eq: ['$admin', chosenId] },
            ],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.teamSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  findTeamByName(name: string) {
    return this.teamSchema.findOne({ name });
  }

  findTeamById(id: string) {
    return this.teamSchema.findOne({
      _id: new Types.ObjectId(id),
    });
  }

  deleteTeam(input: DeleteTeamInput) {
    return this.teamSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }
}
