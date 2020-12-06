import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

@Entity('lessons_feed')
class LessonFeed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject_id: string;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  lesson_id: string;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  desc: string;

  @Column()
  file_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default LessonFeed;
