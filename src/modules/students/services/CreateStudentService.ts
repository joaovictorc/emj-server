import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISubjectRepository from '../repositories/IStudentRepository';

import Subject from '../infra/typeorm/entities/Student';

interface IRequest {
  user_id: string;
  class_id: string;
}

@injectable()
class CreateStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: ISubjectRepository,
  ) {}

  public async execute({ user_id, class_id }: IRequest): Promise<Subject> {
    const checkStudentExists = await this.studentRepository.findById(
      user_id,
      class_id,
    );

    if (checkStudentExists) {
      throw new AppError('This student already exists in this class');
    }

    const student = this.studentRepository.create({
      user_id,
      class_id,
    });

    return student;
  }
}

export default CreateStudentsService;
