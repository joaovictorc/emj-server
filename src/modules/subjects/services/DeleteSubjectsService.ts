import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClassRepository from '../repositories/ISubjectRepository';

interface IRequest {
  subject_id: string;
}

@injectable()
class DeleteSubjectsService {
  constructor(
    @inject('SubjectRepository')
    private subjectService: ISubjectRepository,
  ) {}

  public async execute({ subject_id }: IRequest): Promise<void> {
    const subject = await this.subjectService.findById(subject_id);

    if (!subject) {
      throw new AppError(
        'The subject you are trying to delete does not exist in the records',
      );
    }

    await this.subjectService.delete(subject.id);
  }
}

export default DeleteSubjectsService;
