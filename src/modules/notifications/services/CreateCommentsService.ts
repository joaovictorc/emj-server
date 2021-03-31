import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '../repositories/INotificationsRepository';

import Notification from '../infra/typeorm/entities/Notification';

interface IRequest {
  lesson_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
}

@injectable()
class CreateCommentsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsService: INotificationsRepository,
  ) {}

  public async execute({
    lesson_id,
    user_id,
    parent_id,
    content,
  }: IRequest): Promise<Subject> {
    if (!lesson_id) {
      throw new AppError('lesson_id was not reported');
    }

    if (!user_id) {
      throw new AppError('user_id was not reported');
    }

    if (!content) {
      throw new AppError('content was not reported');
    }

    const comment = this.commentsService.create({
      lesson_id,
      user_id,
      parent_id,
      content,
    });

    return comment;
  }
}

export default CreateCommentsService;
