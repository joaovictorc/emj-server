import { getRepository, Repository } from 'typeorm';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import ICreateStudentsDTO from '@modules/students/dtos/ICreateStudentsDTO';

import Student from '../entities/Student';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findAll(): Promise<Student[] | undefined> {
    const dataClass = await this.ormRepository.find({
      relations: ['user', 'class'],
    });

    return dataClass;
  }

  public async findByUserId(user_id: string): Promise<Student | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { user_id },
      relations: ['user', 'class'],
    });

    console.log(dataClass);

    return dataClass;
  }

  public async findById(
    user_id: string,
    class_id: string,
  ): Promise<Student | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { user_id: user_id, class_id: class_id },
    });

    return dataClass;
  }

  public async create(studentData: ICreateStudentsDTO): Promise<Student> {
    const dataClass = await this.ormRepository.create(studentData);

    console.log(studentData, 'data to be saved');

    await this.ormRepository.save(dataClass);

    return dataClass;
  }

  public async save(studentData: Student): Promise<Student> {
    return this.ormRepository.save(studentData);
  }

  public async delete(studentData: string): Promise<DeleteResult> {
    return this.ormRepository.delete(studentData);
  }
}

export default StudentRepository;
