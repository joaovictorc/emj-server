import { injectable, inject } from 'tsyringe';

import { startOfDay, parseISO } from 'date-fns';

import Lesson from '../infra/typeorm/entities/Lesson';

import AppError from '@shared/errors/AppError';
import ILessonRepository from '../repositories/ILessonRepository';

interface IRequest {
  lesson_id: string;
  title: string;
  desc: string;
  youtube_url: string;
  date: string;
  subjects_id: string;
}

@injectable()
class UpdateLessonsService {
  constructor(
    @inject('LessonRepository')
    private lessonsRepository: ILessonRepository,
  ) {}

  public async execute({
    lesson_id,
    title,
    desc,
    youtube_url,
    date,
  }: IRequest): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findByIdOnly(lesson_id);

    if (!lesson) {
      throw new AppError('Lesson not found');
    }

    const lessonDate = startOfDay(parseISO(date));

    lesson.title = title;
    lesson.desc = desc;
    lesson.youtube_url = youtube_url;
    lesson.date = new Date(lessonDate);

    return this.lessonsRepository.save(lesson);
  }
}

export default UpdateLessonsService;
