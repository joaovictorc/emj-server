import { injectable, inject } from 'tsyringe';

// import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  full_name: string;
  email: string;
  password?: string;
  enrollment: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    full_name,
    email,
    password,
    enrollment,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const useWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (useWithUpdateEmail && useWithUpdateEmail.id !== user_id) {
      throw new AppError('This email already is property of another account');
    }

    const checkUserEnrollmentExists = await this.usersRepository.findByEnrollment(
      enrollment,
    );

    if (
      checkUserEnrollmentExists &&
      checkUserEnrollmentExists.enrollment !== user.enrollment
    ) {
      throw new AppError('Enrollment already used');
    }

    user.full_name = full_name;
    user.email = email;
    user.enrollment = enrollment;

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
