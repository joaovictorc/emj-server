import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSubjectsByUserIdService from '@modules/subjects/services/ListSubjectsByUserIdService';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export default class ListSubjectsByUserIdController {
  public async index(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;

    console.log('chegouu aqui');
    console.log(req.user.id, 'user id!!!!!!');

    const listSubjectsByUserIdService = container.resolve(
      ListSubjectsByUserIdService,
    );

    const subjects = await listSubjectsByUserIdService.execute({ user_id });

    return res.json(subjects);
  }
}
