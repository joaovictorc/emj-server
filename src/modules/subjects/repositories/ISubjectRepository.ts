import Subject from '../infra/typeorm/entities/Subject';
import ICreateSubjectsDTO from '../dtos/ICreateSubjectsDTO';
import { DeleteResult } from 'typeorm';

export default interface ISubjectRepository {
  findAll(): Promise<Subject[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findById(subjectId: string): Promise<Subject | undefined>;
  findByClassId(class_id: string): Promise<Subject[] | undefined>;
  findByTitle(title: string): Promise<Subject | undefined>;
  findByUserId(user_id: string): Promise<Subject[] | undefined>;
  findByTitleAndClassId(
    title: string,
    class_id: string,
  ): Promise<Subject | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(subjectData: ICreateSubjectsDTO): Promise<Subject>;
  save(subjectData: Subject): Promise<Subject>;
  delete(subject_id: string): Promise<DeleteResult>;
}
