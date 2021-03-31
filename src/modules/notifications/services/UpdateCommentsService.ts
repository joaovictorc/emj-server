import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISubjectRepository from '../repositories/ICommentsRepository';

import Subject from '../infra/typeorm/entities/Comment';

interface IRequest {
  subjectId: string;
  title: string;
  emoji: string;
  color: string;
  class_id: string;
}

@injectable()
class UpdateCommentsService {
  constructor(
    @inject('SubjectRepository')
    private subjectService: ISubjectRepository,
  ) {}

  public async execute({
    subjectId,
    title,
    emoji,
    color,
    class_id,
  }: IRequest): Promise<Subject> {
    const subject = await this.subjectService.findById(subjectId);

    if (!subject) {
      throw new AppError('Subject not found');
    }

    const subjectWithUpdateTitle = await this.subjectService.findByTitle(title);

    if (subjectWithUpdateTitle && subjectWithUpdateTitle.id !== subjectId) {
      throw new AppError('Already exists a subject with this title');
    }

    subject.title = title;
    subject.emoji = emoji;
    subject.color = color;
    subject.class_id = class_id;

    return this.subjectService.save(subject);
  }
}

export default UpdateCommentsService;
