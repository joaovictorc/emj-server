import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonFeedRepository from '../repositories/ILessonFeedRepository';

import LessonFeed from '../infra/typeorm/entities/LessonFeed';

interface IRequest {
  lesson_id: string;
}

@injectable()
class ListAllLessonFeedService {
  constructor(
    @inject('LessonFeedRepository')
    private lessonFeedRepository: ILessonFeedRepository,
  ) {}

  public async execute({lesson_id}: IRequest): Promise<LessonFeed[] | undefined> {
    const lessonFeed = this.lessonFeedRepository.findByLessonId(lesson_id);

    if (!lessonFeed) {
      throw new AppError('Não foi encontrado nenhuma atividade no feed desta matéria');
    }

    return lessonFeed;
  }
}

export default ListAllLessonFeedService;
