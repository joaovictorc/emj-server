import { injectable, inject } from 'tsyringe';

import ICommentsRepository from '../repositories/ICommentsRepository';

import Subject from '../infra/typeorm/entities/Comment';

interface IRequest {
  lesson_id: string;
}

@injectable()
class ListAllComments {
  constructor(
    @inject('CommentsRepository')
    private commentsService: ICommentsRepository,
  ) {}

  public async execute({
    lesson_id,
  }: IRequest): Promise<Subject[] | undefined> {
    const subjects = this.commentsService.findByLessonId(lesson_id);

    return subjects;
  }
}

export default ListAllComments;
