import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { DeleteResult } from 'typeorm';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<DeleteResult> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Users not found.');
    }

    await this.usersRepository.delete(user.id);
  }
}

export default ShowProfileService;
