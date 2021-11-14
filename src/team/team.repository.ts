import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { Team, TeamDocument } from './schema/team.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateTeamInput } from './inputs/create-team.input';
import { AddTeamMemberInput } from './inputs/manage-team-member.input';
import { Pagination } from '../shared/utils/pagination.input';

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

  async getMyTeams(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.teamSchema.aggregate([
      {
        $match: {
          $expr: {
            $or: [{ $in: [userId, '$members'] }, { $eq: ['$admin', userId] }],
          },
        },
      },
    ]);
    return await this.teamSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}
