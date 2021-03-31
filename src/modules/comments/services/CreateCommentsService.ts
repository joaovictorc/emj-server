import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICommentsRepository from '../repositories/ICommentsRepository';
import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';
import ILessonRepository from '../../lessons/repositories/ILessonRepository';
import ISubjectRepository from '../../subjects/repositories/ISubjectRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

import Subject from '../infra/typeorm/entities/Comment';

interface IRequest {
  lesson_id: string;
  user_id: string;
  parent_id?: string;
  receiver_id?: string;
  type?: string;
  content: string;
}

@injectable()
class CreateCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsService: ICommentsRepository,

    @inject('LessonRepository')
    private lessonRepository: ILessonRepository,

    @inject('SubjectRepository')
    private subjectService: ISubjectRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsService: INotificationsRepository,
  ) {}

  public async execute({
    lesson_id,
    user_id,
    parent_id,
    receiver_id,
    type,
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

    const lessonData = await this.lessonRepository.findByIdOnly(lesson_id);

    if (!lessonData) {
      throw new AppError('Esta aula não existe');
    }

    const subjectData = await this.subjectService.findById(
      lessonData.subjects_id,
    );

    if (!subjectData) {
      throw new AppError('A aula possui uma matéria cadastrada que não existe');
    }

    const userData = await this.usersRepository.findById(user_id);

    if (!userData) {
      throw new AppError('O usuário não existe.');
    }

    const comment = this.commentsService.create({
      lesson_id,
      user_id,
      parent_id,
      content,
    });

    if (type === 'reply' && receiver_id) {
      await this.notificationsService.create({
        recipient_id: receiver_id, // recipiente recebe a notificação
        content: `Seu comentário foi respondido em ${lessonData.title}`,
        redirect_link: lessonData.id,
      });

      return comment;
    }

    if (subjectData.user_id !== receiver_id) {
      await this.notificationsService.create({
        recipient_id: subjectData.user_id, // professor recebe a notificação
        content: `${userData.full_name} comentou na sua videoaula: ${lessonData.title}`,
        redirect_link: lessonData.id, // usuário que comentou envia a notificação
      });
    }

    return comment;
  }
}

export default CreateCommentsService;
