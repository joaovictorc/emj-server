import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILessonFeedRepository from '../repositories/ILessonFeedRepository';

interface IRequest {
  activityId: string;
}

@injectable()
class CreatePlansService {
  constructor(
    @inject('LessonFeedRepository')
    private lessonFeedRepository: ILessonFeedRepository,
  ) {}

  public async execute({ activityId }: IRequest): Promise<void> {
    const activityData = await this.lessonFeedRepository.findById(activityId);

    if (!activityData) {
      throw new AppError(
        'The class you are trying to delete does not exist in the records',
      );
    }

    await this.lessonFeedRepository.delete(activityData.id);
  }
}

export default CreatePlansService;
