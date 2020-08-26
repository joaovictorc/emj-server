import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClassRepository from '../repositories/IClassRepository';

import Class from '../infra/typeorm/entities/Class';

interface IRequest {
  classId: string;
  title: string;
  desc: string;
}

@injectable()
class UpdateClassService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute({ classId, title, desc }: IRequest): Promise<Class> {
    const classData = await this.classRepository.findById(classId);

    if (!classData) {
      throw new AppError('Plan not found');
    }

    const classWithUpdateTitle = await this.classRepository.findByTitle(title);

    if (classWithUpdateTitle && classWithUpdateTitle.id !== classId) {
      throw new AppError('Already exists a plan with this title');
    }

    classData.title = title;
    classData.desc = desc;

    return this.classRepository.save(classData);
  }
}

export default UpdateClassService;
