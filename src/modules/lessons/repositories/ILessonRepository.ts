import Lesson from '../infra/typeorm/entities/Lesson';
import ICreateLessonsDTO from '../dtos/ICreateLessonsDTO';

export default interface ILessonRepository {
  findAll(): Promise<Lesson[] | undefined>;
  findByDate(
    year: string,
    month: string,
    day: string,
    subjects_id: string,
  ): Promise<Lesson[] | undefined>;
  findByClassId(
    class_id: string,
    year: string,
    month: string,
    day: string,
  ): Promise<Class[] | undefined>;
  findByClassIdOnly(class_id: string): Promise<Class[] | undefined>;
  findBySubjectId(subject_id: string): Promise<Class[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findById(subjects_id: string, title: string): Promise<Lesson | undefined>;
  findByIdOnly(lesson_id: string): Promise<Lesson | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(studentData: ICreateLessonsDTO): Promise<Lesson>;
  save(studentData: Lesson): Promise<Lesson>;
  delete(studentData: string): Promise<DeleteResult>;
}
