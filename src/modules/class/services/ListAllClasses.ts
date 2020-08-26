import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';
import Class from '../infra/typeorm/entities/Class';

@injectable()
class ListAllClasses {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute(): Promise<Class[] | undefined> {
    const classData = this.classRepository.findAll();

    return classData;
  }
}

export default ListAllClasses;
