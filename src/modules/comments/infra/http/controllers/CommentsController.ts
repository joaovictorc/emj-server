import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllComments from '@modules/comments/services/ListAllComments';
import ShowCommentsService from '@modules/comments/services/ShowCommentsService';
import CreateCommentsService from '@modules/comments/services/CreateCommentsService';
import DeleteCommentsService from '@modules/comments/services/DeleteCommentsService';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export default class CommentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.params;

    const listAllComments = container.resolve(ListAllComments);

    const subjects = await listAllComments.execute({ lesson_id });

    return res.json(subjects);
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
    const { lesson_id, parent_id, receiver_id, type, content } = req.body;

    const createCommentsService = container.resolve(CreateCommentsService);

    const comments = await createCommentsService.execute({
      lesson_id,
      user_id,
      parent_id,
      receiver_id,
      type,
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
