import { getRepository, Repository } from 'typeorm';

import IClassRepository from '@modules/class/repositories/IClassRepository';
import ICreateClassDTO from '@modules/class/dtos/ICreateClassDTO';

import Class from '../entities/Class';

class ClassRepository implements IClassRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async findAll(): Promise<Class[] | undefined> {
    const dataClass = await this.ormRepository.find();

    return dataClass;
  }

  public async findById(classId: string): Promise<Class | undefined> {
    const dataClass = await this.ormRepository.findOne(classId);

    return dataClass;
  }

  public async findByTitle(title: string): Promise<Class | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { title: title },
    });

    return dataClass;
  }

  public async create(classData: ICreateClassDTO): Promise<Class> {
    const dataClass = this.ormRepository.create(classData);

    await this.ormRepository.save(dataClass);

    return dataClass;
  }

  public async save(classInfo: Class): Promise<Class> {
    return this.ormRepository.save(classInfo);
  }

  public async delete(classData: string): Promise<DeleteResult> {
    return this.ormRepository.delete(classData);
  }
}

export default ClassRepository;
