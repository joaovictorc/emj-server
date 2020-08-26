import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISubjectRepository from '../repositories/ILessonRepository';

import Subject from '../infra/typeorm/entities/Lesson';

interface IRequest {
  subjectId: string;
  title: string;
}

@injectable()
class UpdateStudentsService {
  constructor(
    @inject('SubjectRepository')
    private subjectService: ISubjectRepository,
  ) {}

  public async execute({ subjectId, title }: IRequest): Promise<Subject> {
    const subject = await this.subjectService.findById(subjectId);

    if (!subject) {
      throw new AppError('Subject not found');
    }

    const subjectWithUpdateTitle = await this.subjectService.findByTitle(title);

    if (subjectWithUpdateTitle && subjectWithUpdateTitle.id !== subjectId) {
      throw new AppError('Already exists a subject with this title');
    }

    subject.title = title;

    return this.subjectService.save(subject);
  }
}

export default UpdateStudentsService;
