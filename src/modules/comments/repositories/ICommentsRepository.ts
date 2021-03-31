import Comment from '../infra/typeorm/entities/Comment';
import ICreateCommentsDTO from '../dtos/ICreateCommentsDTO';
import { DeleteResult } from 'typeorm';

export default interface ICommentsRepository {
  // findAll(): Promise<Subject[] | undefined>;
  findById(comment_id: string): Promise<Comment | undefined>;
  findByLessonId(lesson_id: string): Promise<Comment[] | undefined>;
  create(comment_data: ICreateCommentsDTO): Promise<Comment>;
  save(comment_data: Subject): Promise<Comment>;
  delete(comment_id: string): Promise<DeleteResult>;
}
