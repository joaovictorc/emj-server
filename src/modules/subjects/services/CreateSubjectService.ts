import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISubjectRepository from '../repositories/ISubjectRepository';

import Subject from '../infra/typeorm/entities/Subject';

interface IRequest {
  class_id: string;
  user_id: string;
  title: string;
  emoji: string;
  color: string;
}

@injectable()
class CreateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectService: ISubjectRepository,
  ) {}

  public async execute({
    class_id,
    user_id,
    title,
    emoji,
    color,
  }: IRequest): Promise<Subject> {
    if (!class_id) {
      throw new AppError('Class_id was not reported');
    }

    const checkSubjectExists = await this.subjectService.findByTitleAndClassId(
      title,
      class_id,
    );

    if (checkSubjectExists) {
      throw new AppError('This subject already exists');
    }

    const subject = this.subjectService.create({
      class_id,
      user_id,
      title,
      emoji,
      color,
    });

    return subject;
  }
}

export default CreateSubjectService;
