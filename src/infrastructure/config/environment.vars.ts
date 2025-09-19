import Joi from "joi";
import "dotenv/config";

type Environment = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_SCHEMA: string;
  JWT_SECRET: string;
};

type EnvironmentValidation = {
  error: Joi.ValidationError | undefined;
  value: Environment;
};

const validateVariables = (envs: NodeJS.ProcessEnv): EnvironmentValidation => {
  const envScheme = Joi.object({
    PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SCHEMA: Joi.string().required(),
    JWT_SECRET: Joi.string().required()
  }).unknown();

  const { error, value } = envScheme.validate(envs);

  return { error, value };
};

const loadVariables = (): Environment => {
  const { error, value } = validateVariables(process.env);

  if (error) throw new Error("Error validating environment variables.");

  return {
    PORT: value.PORT,
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_NAME: value.DB_NAME,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_SCHEMA: value.DB_SCHEMA,
    JWT_SECRET: value.JWT_SECRET
  };
};

export default loadVariables();
