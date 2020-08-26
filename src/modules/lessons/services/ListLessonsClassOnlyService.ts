import { injectable, inject } from 'tsyringe';
import { startOfDay, parseISO } from 'date-fns';
import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';

interface IRequest {
  class_id: string;
}

@injectable()
class ListLessonsClassOnlyService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({ class_id }: IRequest): Promise<Lesson[] | undefined> {
    const lessons = this.lessonRepository.findByClassIdOnly(class_id);

    if (!lessons) {
      throw new AppError('No lessons found');
    }

    return lessons;
  }
}

export default ListLessonsClassOnlyService;
