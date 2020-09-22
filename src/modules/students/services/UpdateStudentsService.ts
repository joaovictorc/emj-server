import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISubjectRepository from '../repositories/IStudentRepository';

import Subject from '../infra/typeorm/entities/Student';

interface IRequest {
  user_id: string;
  class_id: string;
}

@injectable()
class UpdateStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: ISubjectRepository,
  ) {}

  public async execute({ user_id, class_id }: IRequest): Promise<Subject> {
    const student = await this.studentRepository.findByUserId(user_id);

    if (!student) {
      throw new AppError('Subject not found');
    }

    student.class_id = class_id;

    return this.studentRepository.save(student);
  }
}

export default UpdateStudentsService;
