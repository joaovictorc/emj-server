import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

import { DeleteResult } from 'typeorm';

export default class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { userOnly } = req.query;

    let onlyUser = userOnly == 'true' ? true : false;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ user_id, onlyUser });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { full_name, email, password, rule, enrollment, class_id } = req.body;

    const createUserService = container.resolve(CreateUserService);
    const createStudentService = container.resolve(CreateStudentService);

    const user = await createUserService.execute({
      full_name,
      email,
      password,
      rule,
      enrollment,
    });

    let user_id = await user.id;

    if (rule === 'student' && class_id) {
      await createStudentService.execute({ user_id, class_id });
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const { full_name, email, old_password, password, enrollment } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      full_name,
      email,
      password,
      enrollment,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<DeleteResult> {
    const { user_id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({
      user_id,
    });

    res.status(204).send();
  }
}
