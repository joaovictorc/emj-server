import { injectable, inject } from 'tsyringe';

import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllLessons {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute(): Promise<Lesson[] | undefined> {
    const lessons = this.lessonRepository.findAll();

    if (!lessons) {
      throw new AppError('No lessons found');
    }

    return lessons;
  }
}

export default ListAllLessons;
