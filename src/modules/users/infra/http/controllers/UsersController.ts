import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

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
}
