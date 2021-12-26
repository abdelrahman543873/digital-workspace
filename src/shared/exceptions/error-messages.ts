import { IErrorMessage } from './error-messages-interface';

export const LocalizedErrorMessages: IErrorMessage = {
  600: { EN: 'Unauthorized', AR: 'غير مصرح له' },
  601: { EN: 'invalid http method', AR: 'invalid http method' },
  602: {
    EN: "user doesn't exist",
    AR: "user doesn't exist",
  },
  603: {
    EN: 'wrong password',
    AR: 'wrong password',
  },
  604: {
    EN: 'invalid currency code',
    AR: 'invalid currency code',
  },
  605: {
    EN: 'you have no posts to show',
    AR: 'you have no posts to show',
  },
  606: {
    EN: "you can't follow yourself",
    AR: "you can't follow yourself",
  },
  607: {
    EN: "your id can't be the direct manager id",
    AR: "your id can't be the direct manager id",
  },
  608: {
    EN: "direct manager id provided doesn't exist",
    AR: "direct manager id provided doesn't exist",
  },
  609: {
    EN: "user doesn't have microsoft token",
    AR: "user doesn't have microsoft token",
  },
  610: {
    EN: "user doesn't have direct manager",
    AR: "user doesn't have direct manager",
  },
};
