import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISubjectRepository from '@modules/subjects/repositories/ISubjectRepository';
import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<User | Student | undefined> {
    let rule: string;
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user?.rule == 'student') {
      rule = user?.rule;

      const student = await this.studentRepository.findByUserId(user.id);

      if (!student) {
        throw new AppError('Student not found.');
      }

      return student;
    }

    return user;
  }
}

export default ShowProfileService;
