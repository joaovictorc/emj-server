import { Router } from 'express';

import LessonController from '../controllers/LessonController';
import LessonsOfTheDayController from '../controllers/LessonsOfTheDayController';
import LessonsByClasController from '../controllers/LessonsByClasController';
import LessonsByClassOnlyController from '../controllers/LessonsByClassOnlyController';
import LessonsBySubjectIdController from '../controllers/LessonsBySubjectIdController';

import ensureAuthenticated from '@modules/users/infra/http/midddlewares/ensureAuthenticated';

const lessonsRouter = Router();
const lessonController = new LessonController();
const lessonsOfTheDayController = new LessonsOfTheDayController();
const lessonsByClasController = new LessonsByClasController();
const lessonsByClassOnlyController = new LessonsByClassOnlyController();
const lessonsBySubjectIdController = new LessonsBySubjectIdController();

lessonsRouter.get('/', lessonController.index);
lessonsRouter.get('/show/:lesson_id', lessonController.show);
lessonsRouter.get('/:subjects_id', lessonsOfTheDayController.index);
lessonsRouter.get('/subject/:subject_id', lessonsBySubjectIdController.index);
lessonsRouter.get('/class/:class_id', lessonsByClasController.index);
lessonsRouter.get('/class/only/:class_id', lessonsByClassOnlyController.index);
lessonsRouter.post('/create', ensureAuthenticated, lessonController.create);
lessonsRouter.put('/:lesson_id', lessonController.update);
lessonsRouter.delete('/:subjectId', lessonController.delete);

export default lessonsRouter;
