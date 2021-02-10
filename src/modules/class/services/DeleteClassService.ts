import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClassRepository from '../repositories/IClassRepository';

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

    if (!classData) {
      throw new AppError(
        'A turma que você está tentando deletar não existe nos registros.',
      );
    }

    // await this.ClassRepository.delete(classData.id);
  }
}

export default CreatePlansService;
