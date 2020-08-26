import { injectable, inject } from 'tsyringe';

import ILessonStatsRepository from '../repositories/ILessonStatsRepository';

import LessonStats from '../infra/typeorm/entities/LessonStats';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllLessonStatsService {
  constructor(
    @inject('LessonStatsRepository')
    private lessonStatsRepository: ILessonStatsRepository,
  ) {}

  public async execute(): Promise<LessonStats[] | undefined> {
    const lessonStats = this.lessonStatsRepository.findAll();

    if (!lessonStats) {
      throw new AppError('Lesson Stats not found');
    }

    return lessonStats;
  }
}

export default ListAllLessonStatsService;
