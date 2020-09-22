import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentRepository from '../repositories/IStudentRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class DeleteStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const student = await this.studentRepository.findByUserId(user_id);

    if (!student) {
      throw new AppError(
        'The student profile you are trying to delete does not exist in the records',
      );
    }

    await this.studentRepository.delete(student.id);
  }
}

export default DeleteStudentsService;
