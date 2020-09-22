import { getRepository, Repository, Raw } from 'typeorm';

import ILessonRepository from '@modules/lessons/repositories/ILessonRepository';
import ICreateLessonsDTO from '@modules/lessons/dtos/ICreateLessonsDTO';

import Lesson from '../entities/Lesson';

class LessonRepository implements ILessonRepository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async findAll(): Promise<Lesson[] | undefined> {
    const dataClass = await this.ormRepository.find({
      relations: ['subjects', 'class'],
    });

    return dataClass;
  }

  public async findByDate(
    year: string,
    month: string,
    day: string,
    subjects_id: string,
  ): Promise<Lesson[] | undefined> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const findLessons = await this.ormRepository.find({
      where: {
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}'`,
        ),
        subjects_id: subjects_id,
      },
    });

    return findLessons;
  }

  public async findByClassId(
    class_id: string,
    year: string,
    month: string,
    day: string,
  ): Promise<Lesson[] | undefined> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const findLessons = await this.ormRepository.find({
      where: {
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}'`,
        ),
        class_id: class_id,
      },
      relations: ['subjects'],
    });

    return findLessons;
  }

  public async findByClassIdOnly(
    class_id: string,
  ): Promise<Lesson[] | undefined> {
    const findLessons = await this.ormRepository.find({
      where: {
        class_id: class_id,
      },
      relations: ['subjects'],
    });

    return findLessons;
  }

  public async findBySubjectId(
    subject_id: string,
  ): Promise<Lesson[] | undefined> {
    const findLessons = await this.ormRepository.find({
      where: {
        subjects_id: subject_id,
      },
      relations: ['subjects'],
    });

    return findLessons;
  }

  public async findById(
    subjects_id: string,
    title: string,
  ): Promise<Lesson | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: { subjects_id: subjects_id, title: title },
    });

    return dataClass;
  }

  public async findByIdOnly(lesson_id: string): Promise<Lesson | undefined> {
    const dataClass = await this.ormRepository.findOne({
      where: {
        id: lesson_id,
      },
      relations: ['class', 'subjects'],
    });

    return dataClass;
  }

  public async create(studentData: ICreateLessonsDTO): Promise<Lesson> {
    const dataClass = await this.ormRepository.create(studentData);

    await this.ormRepository.save(dataClass);

    return dataClass;
  }

  public async save(studentData: Lesson): Promise<Lesson> {
    return this.ormRepository.save(studentData);
  }

  public async delete(lesson_id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(lesson_id);
  }
}

export default LessonRepository;
