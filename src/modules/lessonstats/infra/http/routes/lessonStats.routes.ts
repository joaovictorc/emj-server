import { Router } from 'express';

import LessonStatsController from '../controllers/LessonStatsController';

const lessonStatsRouter = Router();
const lessonStatsController = new LessonStatsController();

lessonStatsRouter.get('/', lessonStatsController.index);
lessonStatsRouter.get('/:lesson_id', lessonStatsController.show);
lessonStatsRouter.post('/', lessonStatsController.create);

export default lessonStatsRouter;
