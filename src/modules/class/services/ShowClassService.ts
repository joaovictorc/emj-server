import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';
import Class from '../infra/typeorm/entities/Class';
import AppError from '@shared/errors/AppError';

interface IRequest {
  class_id: string;
}

@injectable()
class ShowClassService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute({ class_id }: IRequest): Promise<Class | undefined> {
    const classData = this.classRepository.findById(class_id);

    if (!classData) {
      throw new AppError('Class not found');
    }

    return classData;
  }
}

export default ShowClassService;
