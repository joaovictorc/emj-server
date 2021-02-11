import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/midddlewares/ensureAuthenticated';

import ClassController from '../controllers/ClassController';

const classRouter = Router();
const classController = new ClassController();

// classRouter.use(ensureAuthenticated);
classRouter.get('/', classController.index);
classRouter.get('/unique/:class_id', classController.show);
classRouter.post('/', classController.create);
classRouter.put('/:classId', classController.update);
classRouter.delete('/:classId', ensureAuthenticated, classController.delete);

export default classRouter;
