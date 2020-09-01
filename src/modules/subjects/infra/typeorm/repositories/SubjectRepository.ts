import { getRepository, Repository, DeleteResult } from 'typeorm';

import IClassRepository from '@modules/subjects/repositories/ISubjectRepository';
import ICreateSubjectsDTO from '@modules/subjects/dtos/ICreateSubjectsDTO';

import Subject from '../entities/Subject';

class ClassRepository implements IClassRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findAll(): Promise<Subject[] | undefined> {
    const dataClass = await this.ormRepository.find({
      relations: ['class', 'teacher', 'lessons'],
    });

    return dataClass;
  }

  public async findByClassId(class_id: string): Promise<Subject[] | undefined> {
    const dataClass = await this.ormRepository.find({ where: { class_id } });

    return dataClass;
  }

  public async findById(subjectId: string): Promise<Subject | undefined> {
    const dataClass = await this.ormRepository.findOne(subjectId, {
      relations: ['class'],
    });

    return dataClass;
  }

  public async findByUserId(user_id: string): Promise<Subject[] | undefined> {
    const subjects = await this.ormRepository.find({
      where: { user_id },
      relations: ['class', 'lessons'],
    });

    return subjects;
  }

  public async findByTitle(title: string): Promise<Subject | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { title: title },
    });

    return dataClass;
  }

  public async findByTitleAndClassId(
    title: string,
    class_id: string,
  ): Promise<Subject | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { title: title, class_id },
    });

    return dataClass;
  }

  public async create(subjectData: ICreateSubjectsDTO): Promise<Subject> {
    const dataClass = await this.ormRepository.create(subjectData);

    console.log(subjectData, 'data to be saved');

    await this.ormRepository.save(dataClass);

    return dataClass;
  }

  public async save(subjectInfo: Subject): Promise<Subject> {
    return this.ormRepository.save(subjectInfo);
  }

  public async delete(subject_id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(subject_id);
  }
}

export default ClassRepository;
