import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILessonRepository from '../repositories/ILessonRepository';

interface IRequest {
  lesson_id: string;
}

@injectable()
class DeleteLessonsService {
  constructor(
    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,
  ) {}

  public async execute({ lesson_id }: IRequest): Promise<void> {
    const lessonData = await this.lessonRepository.findByIdOnly(lesson_id);

    if (!lessonData) {
      throw new AppError(
        'The class you are trying to delete does not exist in the records',
      );
    }

    await this.lessonRepository.delete(lessonData.id);
  }
}

export default DeleteLessonsService;
