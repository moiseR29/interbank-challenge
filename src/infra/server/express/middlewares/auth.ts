import { ConfigManager } from '@infra/libraries/config';
import { MainError, STATUS_CODE } from '@shared/core';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key = req.headers.secret;
    if (!key)
      throw new MainError(
        'Auth error',
        'you need a key for use this api',
        STATUS_CODE.UNAUTHORIZED,
      );

    const validKey = ConfigManager.server().key;

    if (key !== validKey)
      throw new MainError(
        'Auth error',
        'you need a key for use this api',
        STATUS_CODE.UNAUTHORIZED,
      );

    next();
  } catch (error) {
    next(error);
  }
};
