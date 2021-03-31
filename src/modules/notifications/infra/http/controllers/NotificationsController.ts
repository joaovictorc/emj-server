import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllNotificationsByUserId from '@modules/notifications/services/ListAllNotificationsByUserId';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export default class CommentsController {
  public async index(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;

    const listAllNotificationsByUserId = container.resolve(
      ListAllNotificationsByUserId,
    );

    const notifications = await listAllNotificationsByUserId.execute({
      user_id,
    });

    return res.json(notifications);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.params;

    const showCommentsService = container.resolve(ShowCommentsService);

    const subject = await showCommentsService.execute({ subject_id });

    return res.json(subject);
  }

  public async create(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;
    const { lesson_id, parent_id, content } = req.body;

    const createCommentsService = container.resolve(CreateCommentsService);

    const comments = await createCommentsService.execute({
      lesson_id,
      user_id,
      parent_id,
      content,
    });

    return res.json(comments);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.params;

    const deleteCommentsService = container.resolve(DeleteCommentsService);

    await deleteCommentsService.execute({ subject_id });

    return res.status(204).send();
  }
}
