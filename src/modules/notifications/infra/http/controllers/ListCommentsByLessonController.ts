import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSubjectsByClassIdService from '@modules/subjects/services/ListSubjectsByClassIdService';

export default class ListCommentsByLessonController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { class_id } = req.params;

    const listSubjectsByClassIdService = container.resolve(
      ListSubjectsByClassIdService,
    );

    const subjects = await listSubjectsByClassIdService.execute({ class_id });

    return res.json(subjects);
  }
}
