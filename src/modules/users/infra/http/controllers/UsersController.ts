import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

import { DeleteResult } from 'typeorm';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { full_name, email, password, rule, enrollment } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      full_name,
      email,
      password,
      rule,
      enrollment,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const { full_name, email, old_password, password } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id,
      full_name,
      email,
      old_password,
      password,
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
