import Student from '../infra/typeorm/entities/Student';
import ICreateStudentsDTO from '../dtos/ICreateStudentsDTO';

export default interface IStudentRepository {
  findAll(): Promise<Student[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findByUserId(user_id: string): Promise<Student | undefined>;
  findById(user_id: string, class_id: string): Promise<Student | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(studentData: ICreateStudentsDTO): Promise<Student>;
  save(studentData: Student): Promise<Student>;
  delete(studentData: string): Promise<DeleteResult>;
}
