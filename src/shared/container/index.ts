import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepositories from '@modules/users/infra/typeorm/repositories/UserTokensRepositories';

import IClassRepository from '@modules/class/repositories/IClassRepository';
import ClassRepository from '@modules/class/infra/typeorm/repositories/ClassRepository';

import ISubjectRepository from '@modules/subjects/repositories/ISubjectRepository';
import SubjectRepository from '@modules/subjects/infra/typeorm/repositories/SubjectRepository';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import StudentRepository from '@modules/students/infra/typeorm/repositories/StudentRepository';

import ILessonRepository from '@modules/lessons/repositories/ILessonRepository';
import LessonRepository from '@modules/lessons/infra/typeorm/repositories/LessonRepository';

import ILessonStatsRepository from '@modules/lessonstats/repositories/ILessonStatsRepository';
import LessonStatsRepository from '@modules/lessonstats/infra/typeorm/repositories/LessonStatsRepository';

import ILessonFeedRepository from '@modules/lessons_feed/repositories/ILessonFeedRepository';
import LessonFeedRepository from '@modules/lessons_feed/infra/typeorm/repositories/LessonFeedRepository';

import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepositories,
);

container.registerSingleton<IClassRepository>(
  'ClassRepository',
  ClassRepository,
);

container.registerSingleton<ISubjectRepository>(
  'SubjectRepository',
  SubjectRepository,
);

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);

container.registerSingleton<ILessonRepository>(
  'LessonRepository',
  LessonRepository,
);

container.registerSingleton<ILessonStatsRepository>(
  'LessonStatsRepository',
  LessonStatsRepository,
);

container.registerSingleton<ILessonFeedRepository>(
  'LessonFeedRepository',
  LessonFeedRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
