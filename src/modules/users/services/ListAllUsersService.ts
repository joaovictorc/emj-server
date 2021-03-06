import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const user = await this.usersRepository.findAll();

    if (!user) {
      throw new AppError('Usuários não encontrados.');
    }

    return user;
  }
}

export default ShowProfileService;
