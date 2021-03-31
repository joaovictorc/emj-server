import { Router } from 'express';

import CommentsController from '../controllers/CommentsController';
import ListCommentsByLessonController from '../controllers/ListCommentsByLessonController';
import ensureAuthenticated from '@modules/users/infra/http/midddlewares/ensureAuthenticated';

const commentsRouter = Router();
const commentsController = new CommentsController();
const listCommentsByLessonController = new ListCommentsByLessonController();

commentsRouter.get('/:lesson_id', commentsController.index);
commentsRouter.get('/unique/:lesson_id', commentsController.show);
commentsRouter.get('/:lesson_id', listCommentsByLessonController.index);
commentsRouter.post('/', ensureAuthenticated, commentsController.create);
commentsRouter.delete('/:comment_id', commentsController.delete);

export default commentsRouter;
