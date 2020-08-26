import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Class from '@modules/class/infra/typeorm/entities/Class';
import User from '@modules/users/infra/typeorm/entities/User';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @OneToMany((type) => Lesson, (lesson) => lesson.subjects)
  lessons: Lesson[];

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  teacher: Class;

  @Column()
  title: string;

  @Column()
  emoji: string;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;
