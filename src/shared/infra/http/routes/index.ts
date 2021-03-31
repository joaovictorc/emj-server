import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import classRouter from '@modules/class/infra/http/routes/class.routes';
import subjectsRouter from '@modules/subjects/infra/http/routes/subjects.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import lessonsRouter from '@modules/lessons/infra/http/routes/lessons.routes';
import lessonStatsRouter from '@modules/lessonstats/infra/http/routes/lessonStats.routes';
import lessonFeedRouter from '@modules/lessons_feed/infra/http/routes/lessonFeed.routes';
import commentsRouter from '@modules/comments/infra/http/routes/comments.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/class', classRouter);
routes.use('/subjects', subjectsRouter);
routes.use('/students', studentsRouter);
routes.use('/lessons', lessonsRouter);
routes.use('/lesson-stats', lessonStatsRouter);
routes.use('/lesson-feed', lessonFeedRouter);
routes.use('/comments', commentsRouter);
routes.use('/notifications', notificationsRouter);

export default routes;
