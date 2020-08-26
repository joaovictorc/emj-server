import { Router } from 'express';

import SubjectController from '../controllers/SubjectController';
import ListSubjectsByClassController from '../controllers/ListSubjectsByClassController';
import ListSubjectsByUserIdController from '../controllers/ListSubjectsByUserIdController';
import ensureAuthenticated from '@modules/users/infra/http/midddlewares/ensureAuthenticated';

const subjectsRouter = Router();
const subjectController = new SubjectController();
const listSubjectsByClassController = new ListSubjectsByClassController();
const listSubjectsByUserIdController = new ListSubjectsByUserIdController();

subjectsRouter.get('/', subjectController.index);
subjectsRouter.get('/unique/:subject_id', subjectController.show);
subjectsRouter.get('/:class_id', listSubjectsByClassController.index);
subjectsRouter.get(
  '/teacher/all',
  ensureAuthenticated,
  listSubjectsByUserIdController.index,
);
subjectsRouter.post('/', subjectController.create);
subjectsRouter.put('/:subjectId', subjectController.update);
subjectsRouter.delete('/:subjectId', subjectController.delete);

export default subjectsRouter;
