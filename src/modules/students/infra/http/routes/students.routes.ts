import { Router } from 'express';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/', studentsController.index);
studentsRouter.post('/', studentsController.create);
studentsRouter.put('/:subjectId', studentsController.update);
studentsRouter.delete('/:subjectId', studentsController.delete);

export default studentsRouter;
