import { injectable, inject } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Student';

@injectable()
class ListAllStudents {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(): Promise<Student[] | undefined> {
    const students = this.studentRepository.findAll();

    return students;
  }
}

export default ListAllStudents;
