import { InternalServerErrorException } from '@nestjs/common';
import * as process from 'process';

export const getEvnPath = () => {
  const nodeEnv = `${process.env.NODE_ENV}`;

  const allowedEnvConst = ['local', 'development', 'test', 'production'];

  if (!allowedEnvConst.includes(nodeEnv))
    throw new InternalServerErrorException(
      `${nodeEnv} parameter does not specified in .env file`,
    );

  return `.env.${nodeEnv}`;
};
