import { injectable, inject } from 'tsyringe';
import { startOfDay, parseISO } from 'date-fns';
import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';

interface IRequest {
  year: string;
  month: string;
  day: string;
  subjects_id: string;
}

@injectable()
class ListAllLessons {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({
    year,
    month,
    day,
    subjects_id,
  }: IRequest): Promise<Lesson[] | undefined> {
    // const lessonsDate = startOfDay(parseISO(date));

    // console.log(lessonsDate, 'date');
    const lessons = this.lessonRepository.findByDate(
      year,
      month,
      day,
      subjects_id,
    );

    return lessons;
  }
}

export default ListAllLessons;
