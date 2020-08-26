import { injectable, inject } from 'tsyringe';

import ISubjectRepository from '../repositories/ISubjectRepository';

import Subject from '../infra/typeorm/entities/Subject';
import AppError from '@shared/errors/AppError';

interface IRequest {
  subject_id: string;
}

@injectable()
class ListAllSubjects {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute({ subject_id }: IRequest): Promise<Subject | undefined> {
    const subject = this.subjectRepository.findById(subject_id);

    if (!subject) {
      throw new AppError('Subject not found');
    }

    return subject;
  }
}

export default ListAllSubjects;
