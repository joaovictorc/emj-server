import { getRepository, Repository } from 'typeorm';

import ILessonFeedRepository from '@modules/lessons_feed/repositories/ILessonFeedRepository';
import ICreateLessonFeedDTO from '@modules/lessons_feed/dtos/ICreateLessonFeedDTO';

import LessonFeed from '../entities/LessonFeed';

class LessonFeedRepository implements ILessonFeedRepository {
  private ormRepository: Repository<LessonFeed>;

  constructor() {
    this.ormRepository = getRepository(LessonFeed);
  }

  public async findAll(): Promise<LessonFeed[] | undefined> {
    const lessonFeed = await this.ormRepository.find({
      relations: ['user', 'lesson'],
    });

    return lessonFeed;
  }

  public async findBySubjectId(
    subject_id: string,
  ): Promise<LessonFeed[] | undefined> {
    const lessonFeed = await this.ormRepository.find({
      where: { subject_id: subject_id },
      relations: ['user', 'lesson'],
    });

    return lessonFeed;
  }

  public async findByLessonId(
    lesson_id: string,
  ): Promise<LessonFeed[] | undefined> {
    const lessonFeed = await this.ormRepository.find({
      where: { lesson_id: lesson_id },
      relations: ['user', 'lesson'],
    });

    return lessonFeed;
  }

  public async findAllByUserId(
    user_id: string,
  ): Promise<LessonFeed[] | undefined> {
    const lessonFeed = await this.ormRepository.find({
      where: { user_id },
      relations: ['user', 'lesson'],
    });

    return lessonFeed;
  }

  public async findByUserId(user_id: string): Promise<LessonFeed | undefined> {
    const lessonFeed = await this.ormRepository.findOne({
      where: { user_id },
      relations: ['user', 'lesson'],
    });

    return lessonFeed;
  }

  public async findByUserIdAndLessonId(
    user_id: string,
    lesson_id: string,
  ): Promise<LessonFeed | undefined> {
    const lessonFeed = await this.ormRepository.findOne({
      where: { user_id: user_id, lesson_id: lesson_id },
    });

    return lessonFeed;
  }

  public async create(
    lessonFeedData: ICreateLessonFeedDTO,
  ): Promise<LessonFeed> {
    const lessonFeed = await this.ormRepository.create(lessonFeedData);

    await this.ormRepository.save(lessonFeed);

    return lessonFeed;
  }

  public async save(lessonFeed: LessonFeed): Promise<LessonFeed> {
    return this.ormRepository.save(lessonFeed);
  }

  public async delete(lessonFeed: string): Promise<DeleteResult> {
    return this.ormRepository.delete(lessonFeed);
  }
}

export default LessonFeedRepository;
