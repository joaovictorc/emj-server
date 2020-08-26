import { injectable, inject } from 'tsyringe';

import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';

interface IRequest {
  lesson_id: string;
}

@injectable()
class ShowLessonService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({ lesson_id }: IRequest): Promise<Lesson | undefined> {
    const lessons = this.lessonRepository.findByIdOnly(lesson_id);

    if (!lessons) {
      throw new AppError('No lessons found');
    }

    return lessons;
  }
}

export default ShowLessonService;
