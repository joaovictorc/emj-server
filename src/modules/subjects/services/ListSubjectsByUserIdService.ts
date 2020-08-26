import { injectable, inject } from 'tsyringe';

import ISubjectRepository from '../repositories/ISubjectRepository';

import Subject from '../infra/typeorm/entities/Subject';

interface IRequest {
  user_id: string;
}

@injectable()
class ListSubjectsByUserIdService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Subject[] | undefined> {
    const subjects = this.subjectRepository.findByUserId(user_id);

    return subjects;
  }
}

export default ListSubjectsByUserIdService;
