import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClassRepository from '../repositories/ISubjectRepository';

interface IRequest {
  classId: string;
}

@injectable()
class CreatePlansService {
  constructor(
    @inject('ClassRepository')
    private ClassRepository: IClassRepository,
  ) {}

  public async execute({ classId }: IRequest): Promise<void> {
    const classData = await this.ClassRepository.findById(classId);

    console.log(classData);

    if (!classData) {
      throw new AppError(
        'The class you are trying to delete does not exist in the records',
      );
    }

    await this.ClassRepository.delete(classData.id);
  }
}

export default CreatePlansService;
