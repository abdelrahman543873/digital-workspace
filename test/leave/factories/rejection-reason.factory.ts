import { datatype } from 'faker';
import { RejectionReason } from '../../../src/leave/schema/rejection-reason.schema';
import { rejectionReasonTestRepo } from '../test-repos/rejection-reason-test-repo';

interface RejectionReasonType {
  name?: string;
}

export const buildRejectionReasonParams = (
  obj: RejectionReasonType = {},
): RejectionReasonType => {
  return {
    name: obj.name || datatype.uuid(),
  };
};

export const rejectionReasonsFactory = async (
  count = 10,
  obj: RejectionReasonType = {},
): Promise<RejectionReason[]> => {
  const rejectionReasons: RejectionReasonType[] = [];
  for (let i = 0; i < count; i++) {
    rejectionReasons.push(buildRejectionReasonParams(obj));
  }
  return await rejectionReasonTestRepo().addMany(rejectionReasons);
};

export const rejectionReasonFactory = async (
  obj: RejectionReasonType = {},
): Promise<RejectionReason> => {
  const params: RejectionReasonType = buildRejectionReasonParams(obj);
  return await rejectionReasonTestRepo().add(params);
};
