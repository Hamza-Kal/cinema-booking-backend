import Joi from 'joi';

interface IConfig {
  api: { port: number; host: string };
  db: { uri: string };
}

const configSchema = Joi.object({
  API_PORT: Joi.number().integer().min(1).max(65535).required(),
  API_HOST: Joi.string().hostname().required(),
  DB_URI: Joi.string().uri().required(),
});

let cachedConfig: IConfig | null = null;

const validateConfig = (): IConfig => {
  const { error, value } = configSchema.validate(process.env, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    api: { port: +value.API_PORT, host: value.API_HOST },
    db: { uri: value.DB_URI },
  };
};

const getConfigs = (): IConfig => {
  // If the configuration has already been validated and cached, return it
  if (cachedConfig) {
    return cachedConfig;
  }

  cachedConfig = validateConfig();
  return cachedConfig;
};

export const config = getConfigs();
