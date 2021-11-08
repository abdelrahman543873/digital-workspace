import * as Joi from 'joi';

export const UpdateUserJoi = Joi.object({
  password: Joi.string().min(8).disallow(Joi.ref('newPassword')),
  newPassword: Joi.string().min(8).optional(),
  profilePic: Joi.array(),
  coverPic: Joi.array(),
})
  .with('password', 'newPassword')
  .with('newPassword', 'password');
