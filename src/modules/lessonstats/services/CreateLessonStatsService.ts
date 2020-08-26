import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonStatsRepository from '../repositories/ILessonStatsRepository';

import Teacher from '../infra/typeorm/entities/LessonStats';

interface IRequest {
  user_id: string;
  lesson_id: string;
}

@injectable()
class CreateLessonStatsService {
  constructor(
    @inject('LessonStatsRepository')
    private lessonStatsRepository: ILessonStatsRepository,
  ) {}

  public async execute({ user_id, lesson_id }: IRequest): Promise<Teacher> {
    const checkLessonStatsExists = await this.lessonStatsRepository.findByUserIdAndLessonId(
      user_id,
      lesson_id,
    );

    if (checkLessonStatsExists) {
      throw new AppError('This user already watch this lesson');
    }

    const lessonStats = this.lessonStatsRepository.create({
      user_id,
      lesson_id,
    });

    return lessonStats;
  }
}

export default CreateLessonStatsService;
