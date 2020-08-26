import { injectable, inject } from 'tsyringe';
import { startOfDay, parseISO } from 'date-fns';
import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';

interface IRequest {
  year: string;
  month: string;
  day: string;
  class_id: string;
}

@injectable()
class ListLessonsClassService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({
    year,
    month,
    day,
    class_id,
  }: IRequest): Promise<Lesson[] | undefined> {
    // const lessonsDate = startOfDay(parseISO(date));

    // console.log(lessonsDate, 'date');
    const lessons = this.lessonRepository.findByClassId(
      class_id,
      year,
      month,
      day,
    );

    if (!lessons) {
      throw new AppError('No lessons found');
    }

    return lessons;
  }
}

export default ListLessonsClassService;
