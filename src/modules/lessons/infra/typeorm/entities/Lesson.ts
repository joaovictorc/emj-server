import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subject from '@modules/subjects/infra/typeorm/entities/Subject';
import Class from '@modules/class/infra/typeorm/entities/Class';

@Entity('lessons')
class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subjects_id: string;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjects_id' })
  subjects: Subject;

  @Column()
  class_id: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  schedule_time: Date;

  @Column()
  date: Date;

  @Column()
  youtube_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lesson;
