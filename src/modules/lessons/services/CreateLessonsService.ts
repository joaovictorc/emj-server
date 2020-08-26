import { injectable, inject } from 'tsyringe';
import { startOfDay, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ILessonRepository from '../repositories/ILessonRepository';

import Subject from '../infra/typeorm/entities/Lesson';

interface IRequest {
  subjects_id: string;
  class_id: string;
  title: string;
  desc: string;
  schedule_time: date;
  youtube_url: string;
}

@injectable()
class CreateLessonsService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({
    subjects_id,
    class_id,
    title,
    desc,
    schedule_time,
    date,
    youtube_url,
  }: IRequest): Promise<Subject | undefined> {
    const checkLessonExists = await this.lessonRepository.findById(
      subjects_id,
      title,
    );

    if (checkLessonExists) {
      throw new AppError('This lesson already exists in this subject');
    }

    const lessonDate = startOfDay(parseISO(date));

    const lesson = this.lessonRepository.create({
      subjects_id,
      class_id,
      title,
      desc,
      schedule_time,
      date: new Date(lessonDate),
      youtube_url,
    });

    const lessonCreated = await this.lessonRepository.findByIdOnly(
      (await lesson).id,
    );

    return lessonCreated;
  }
}

export default CreateLessonsService;
