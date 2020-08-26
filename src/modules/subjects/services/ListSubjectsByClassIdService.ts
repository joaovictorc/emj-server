import { injectable, inject } from 'tsyringe';

import ISubjectRepository from '../repositories/ISubjectRepository';

import Subject from '../infra/typeorm/entities/Subject';

interface IRequest {
  class_id: string;
}

@injectable()
class ListAllSubjects {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute({ class_id }: IRequest): Promise<Subject[] | undefined> {
    const subjects = this.subjectRepository.findByClassId(class_id);

    return subjects;
  }
}

export default ListAllSubjects;
