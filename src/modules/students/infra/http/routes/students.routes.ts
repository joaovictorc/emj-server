import { Router } from 'express';

import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/', studentsController.index);
studentsRouter.post('/', studentsController.create);
studentsRouter.put('/:user_id', studentsController.update);
studentsRouter.delete('/:user_id', studentsController.delete);

export default studentsRouter;
