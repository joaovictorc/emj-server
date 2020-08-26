import { getRepository, Repository } from 'typeorm';

import ILessonStatsRepository from '@modules/lessonstats/repositories/ILessonStatsRepository';
import ICreateLessonStatsDTO from '@modules/lessonstats/dtos/ICreateLessonStatsDTO';

import LessonStats from '../entities/LessonStats';

class LessonStatsRepository implements ILessonStatsRepository {
  private ormRepository: Repository<Teacher>;

  constructor() {
    this.ormRepository = getRepository(LessonStats);
  }

  public async findAll(): Promise<Teacher[] | undefined> {
    const lessonStats = await this.ormRepository.find({
      relations: ['user', 'lesson'],
    });

    return lessonStats;
  }

  public async findByLessonId(
    lesson_id: string,
  ): Promise<Teacher[] | undefined> {
    const lessonStats = await this.ormRepository.find({
      where: { lesson_id: lesson_id },
      relations: ['user', 'lesson'],
    });

    return lessonStats;
  }

  public async findAllByUserId(
    user_id: string,
  ): Promise<Teacher[] | undefined> {
    const lessonStats = await this.ormRepository.find({
      where: { user_id },
      relations: ['user', 'lesson'],
    });

    return lessonStats;
  }

  public async findByUserId(user_id: string): Promise<Teacher | undefined> {
    const lessonStats = await this.ormRepository.findOne({
      where: { user_id },
      relations: ['user', 'lesson'],
    });

    return lessonStats;
  }

  public async findByUserIdAndLessonId(
    user_id: string,
    lesson_id: string,
  ): Promise<Teacher | undefined> {
    const lessonStats = await this.ormRepository.findOne({
      where: { user_id: user_id, lesson_id: lesson_id },
    });

    return lessonStats;
  }

  public async create(
    lessonStatsData: ICreateLessonStatsDTO,
  ): Promise<Teacher> {
    const lessonStats = await this.ormRepository.create(lessonStatsData);

    await this.ormRepository.save(lessonStats);

    return lessonStats;
  }

  public async save(lessonStats: Teacher): Promise<Teacher> {
    return this.ormRepository.save(lessonStats);
  }

  public async delete(lessonStats: string): Promise<DeleteResult> {
    return this.ormRepository.delete(lessonStats);
  }
}

export default LessonStatsRepository;
