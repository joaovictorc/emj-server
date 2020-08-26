import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export default class ProfileController {
  public async index(req: Req, res: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const users = await listAllUsersService.execute();

    return res.json(users);
  }

  public async show(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return res.json(user);
  }

  public async update(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;

    const { full_name, email, old_password, password } = req.body;
    console.log(old_password);

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      full_name,
      email,
      old_password,
      password,
    });

    return res.json(user);
  }
}
