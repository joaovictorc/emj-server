import LessonStats from '../infra/typeorm/entities/LessonStats';
import ICreateLessonStatsDTO from '../dtos/ICreateLessonStatsDTO';

export default interface ILessonStatsRepository {
  findAll(): Promise<LessonStats[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findByLessonId(lesson_id: string): Promise<LessonStats[] | undefined>;
  findByUserId(user_id: string): Promise<LessonStats | undefined>;
  findAllByUserId(user_id: string): Promise<LessonStats[] | undefined>;
  findByUserIdAndLessonId(
    user_id: string,
    lesson_id: string,
  ): Promise<LessonStats | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(lessonStatsData: ICreateLessonStatsDTO): Promise<LessonStats>;
  save(lessonStats: LessonStats): Promise<LessonStats>;
  delete(lessonStats: string): Promise<DeleteResult>;
}
