import * as Joi from 'joi';

export const validationSchema: Joi.ObjectSchema<any> = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  //   JWT_SECRET: Joi.string().required(),
});
