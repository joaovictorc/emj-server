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

import User from '@modules/users/infra/typeorm/entities/User';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lesson_id: string;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  // @OneToMany((type) => Lesson, (lesson) => lesson.subjects)
  // lessons: Lesson[];

  @Column()
  user_id: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  author: User;

  @Column()
  parent_id: string;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'parent_id' })
  parent: Comment;

  @OneToMany((type) => Comment, (child) => child.id)
  child: Comment[];

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
