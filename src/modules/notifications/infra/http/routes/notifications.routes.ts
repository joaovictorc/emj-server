import { Router } from 'express';

import NotificationsController from '../controllers/NotificationsController';
import ensureAuthenticated from '@modules/users/infra/http/midddlewares/ensureAuthenticated';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.get(
  '/',
  ensureAuthenticated,
  notificationsController.index,
);

export default notificationsRouter;
