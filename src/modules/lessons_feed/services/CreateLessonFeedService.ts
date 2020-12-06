import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonFeedRepository from '../repositories/ILessonFeedRepository';

import LessonFeed from '../infra/typeorm/entities/LessonFeed';

interface IRequest {
  user_id: string;
  subject_id: string;
  lesson_id: string;
  desc: string;
  file_url: string;
  file_name: string;
  file_type: string;
}

@injectable()
class CreateLessonStatsService {
  constructor(
    @inject('LessonFeedRepository')
    private lessonFeedRepository: ILessonFeedRepository,
  ) {}

  public async execute({ user_id, subject_id, lesson_id, desc, file_url, file_name, file_type }: IRequest): Promise<LessonFeed> {

    function isValidUrl(string: string) {
      try {
        new URL(string);
      } catch (_) {
        return false;
      }

      return true;
    }

    if (!isValidUrl(file_url)) {
      throw new AppError('O arquivo enviado não possui uma URL válida para download. Atualize a página e tente novamente.');
    }

    // const checkLessonStatsExists = await this.lessonStatsRepository.findByUserIdAndLessonId(
    //   user_id,
    //   lesson_id,
    // );

    // if (checkLessonStatsExists) {
    //   throw new AppError('This user already watch this lesson');
    // }

    const lessonStats = this.lessonFeedRepository.create({
      user_id,
      subject_id,
      lesson_id,
      desc,
      file_url,
      file_name,
      file_type
    });

    return lessonStats;
  }
}

export default CreateLessonStatsService;
