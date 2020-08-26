import { Router } from 'express';

import ClassController from '../controllers/ClassController';

const classRouter = Router();
const classController = new ClassController();

classRouter.get('/', classController.index);
classRouter.get('/unique/:class_id', classController.show);
classRouter.post('/', classController.create);
classRouter.put('/:classId', classController.update);
classRouter.delete('/:classId', classController.delete);

export default classRouter;
