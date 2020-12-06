import { injectable, inject } from 'tsyringe';

import ILessonStatsRepository from '../repositories/ILessonStatsRepository';

import LessonStats from '../infra/typeorm/entities/LessonStats';
import AppError from '@shared/errors/AppError';

interface IRequest {
  lesson_id: string;
}

@injectable()
class ShowLessonStatsService {
  constructor(
    @inject('LessonStatsRepository')
    private lessonStatsRepository: ILessonStatsRepository,
  ) {}

  public async execute({
    lesson_id,
  }: IRequest): Promise<LessonStats[] | undefined> {
    const lessonStats = this.lessonStatsRepository.findByLessonId(lesson_id);

    if (!lessonStats) {
      throw new AppError('Lesson Stat not found');
    }

    return lessonStats;
  }
}

export default ShowLessonStatsService;
