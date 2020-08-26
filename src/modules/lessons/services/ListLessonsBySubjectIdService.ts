import { injectable, inject } from 'tsyringe';

import ILessonRepository from '../repositories/ILessonRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import AppError from '@shared/errors/AppError';

interface IRequest {
  subject_id: string;
}

@injectable()
class ListLessonsBySubjectIdService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({
    subject_id,
  }: IRequest): Promise<Lesson[] | undefined> {
    const lessons = this.lessonRepository.findBySubjectId(subject_id);

    if (!lessons) {
      throw new AppError('No lessons found');
    }

    return lessons;
  }
}

export default ListLessonsBySubjectIdService;
