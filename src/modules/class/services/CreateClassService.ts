import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClassRepository from '../repositories/IClassRepository';

import Class from '../infra/typeorm/entities/Class';

interface IRequest {
  title: string;
  desc: string;
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute({ title, desc }: IRequest): Promise<Class> {
    const checkClassExists = await this.classRepository.findByTitle(title);

    if (checkClassExists) {
      throw new AppError('This class already exists');
    }

    const dataClass = this.classRepository.create({
      title,
      desc,
    });

    return dataClass;
  }
}

export default CreateClassService;
