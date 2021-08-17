import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UsersRepositories';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;
  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = (await usersRepositories.findOne(user_id)) as User;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: 'Unauthorized',
  });
}
