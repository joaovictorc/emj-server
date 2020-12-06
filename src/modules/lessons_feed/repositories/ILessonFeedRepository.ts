import LessonFeed from '../infra/typeorm/entities/LessonFeed';
import ICreateLessonFeedDTO from '../dtos/ICreateLessonFeedDTO';
export default interface ILessonStatsRepository {
  findAll(): Promise<LessonFeed[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findById(activityId: string): Promise<LessonFeed | undefined>;
  findBySubjectId(subject_id: string): Promise<LessonFeed[] | undefined>;
  findByLessonId(lesson_id: string): Promise<LessonFeed[] | undefined>;
  findByUserId(user_id: string): Promise<LessonFeed | undefined>;
  findAllByUserId(user_id: string): Promise<LessonFeed[] | undefined>;
  findByUserIdAndLessonId(
    user_id: string,
    lesson_id: string,
  ): Promise<LessonFeed | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(lessonFeedData: ICreateLessonFeedDTO): Promise<LessonFeed>;
  save(lessonFeed: LessonFeed): Promise<LessonFeed>;
  delete(lessonFeed: string): Promise<DeleteResult>;
}
