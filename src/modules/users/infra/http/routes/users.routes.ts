import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();

usersRouter.get('/:user_id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.post(
  '/avatar',
  upload.single('avatar'),
  usersController.update,
);
usersRouter.put('/:user_id', usersController.update);
usersRouter.delete('/:user_id', usersController.delete);

export default usersRouter;
