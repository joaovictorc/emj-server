import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  full_name: string;
  email: string;
  password: string;
  rule: string;
  enrollment: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    full_name,
    email,
    password,
    rule,
    enrollment,
  }: Request): Promise<User> {
    // check if email is used
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);

    if (checkUserEmailExists) {
      throw new AppError('Este e-mail já está cadastrado.');
    }

    const checkUserEnrollmentExists = await this.usersRepository.findByEnrollment(
      enrollment,
    );

    if (checkUserEnrollmentExists) {
      throw new AppError('Matrícula já utilizada. Use outra matrícula.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      full_name,
      email,
      password: hashedPassword,
      rule,
      enrollment,
    });

    return user;
  }
}

export default CreateUserService;
