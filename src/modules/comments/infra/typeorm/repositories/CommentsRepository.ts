import { getRepository, Repository, DeleteResult, Not, IsNull } from 'typeorm';

import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import ICreateCommentsDTO from '@modules/comments/dtos/ICreateCommentsDTO';

import Comment from '../entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findById(comment_id: string): Promise<Comment | undefined> {
    const comment_data = await this.ormRepository.findOne(comment_id, {
      relations: ['lesson', 'author', 'parent'],
    });

    return comment_data;
  }

  public async findByLessonId(
    lesson_id: string,
  ): Promise<Comment[] | undefined> {
    const comment_data = await this.ormRepository.find({
      where: { lesson_id, parent_id: null },
    });

    const child_data = await this.ormRepository.find({
      where: { lesson_id, parent_id: Not(IsNull()) },
    });

    // const comment_data = await getRepository(Comment)
    // .createQueryBuilder("comment").leftJoinAndSelect("comment.photos", "photo")

    return {
      count: comment_data.length + child_data.length,
      comment_data,
      child_data,
    };
  }

  public async create(comment_data: ICreateCommentsDTO): Promise<Comment> {
    const comment = await this.ormRepository.create(comment_data);

    await this.ormRepository.save(comment);

    return comment;
  }

  public async save(comment_data: Comment): Promise<Comment> {
    return this.ormRepository.save(comment_data);
  }

  public async delete(comment_id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(comment_id);
  }
}

export default CommentsRepository;
