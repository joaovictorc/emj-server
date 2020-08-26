import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLessonsClassService from '@modules/lessons/services/ListLessonsClassService';

export default class LessonController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { class_id } = req.params;
    const { year, month, day } = req.query;

    const listLessonsClassService = container.resolve(ListLessonsClassService);

    const lessons = await listLessonsClassService.execute({
      year,
      month,
      day,
      class_id,
    });

    return res.json(lessons);
  }
}
