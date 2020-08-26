import Class from '../infra/typeorm/entities/Class';
import ICreateClassDTO from '../dtos/ICreateClassDTO';

export default interface IClassRepository {
  findAll(): Promise<Class[] | undefined>;
  // findAllWhen(match: IListAllClasssDTO): Promise<Class[] | undefined>;
  findById(classId: string): Promise<Class | undefined>;
  findByTitle(title: string): Promise<Class | undefined>;
  // findByEnrollment(enrollment: string): Promise<Class | undefined>;
  create(classData: ICreateClassDTO): Promise<Class>;
  save(classInfo: Class): Promise<Class>;
  delete(classData: string): Promise<DeleteResult>;
}
