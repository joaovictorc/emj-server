import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLessonsClassOnlyService from '@modules/lessons/services/ListLessonsClassOnlyService';

export default class LessonController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { class_id } = req.params;

    const listLessonsClassOnlyService = container.resolve(
      ListLessonsClassOnlyService,
    );

    const lessons = await listLessonsClassOnlyService.execute({
      class_id,
    });

    return res.json(lessons);
  }
}
