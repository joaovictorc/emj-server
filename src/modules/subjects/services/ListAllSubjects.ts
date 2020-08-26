import { injectable, inject } from 'tsyringe';

import ISubjectRepository from '../repositories/ISubjectRepository';

import Subject from '../infra/typeorm/entities/Subject';

@injectable()
class ListAllSubjects {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute(): Promise<Subject[] | undefined> {
    const subjects = this.subjectRepository.findAll();

    return subjects;
  }
}

export default ListAllSubjects;
