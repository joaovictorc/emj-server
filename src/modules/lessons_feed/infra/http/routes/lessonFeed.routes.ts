import { Router } from 'express';

import LessonFeedController from '../controllers/LessonFeedController';

const lessonFeedRouter = Router();
const lessonFeedController = new LessonFeedController();

lessonFeedRouter.get('/', lessonFeedController.index);
lessonFeedRouter.get('/:lesson_id', lessonFeedController.show);
lessonFeedRouter.post('/', lessonFeedController.create);
lessonFeedRouter.delete('/:activityId', lessonFeedController.delete);

export default lessonFeedRouter;
