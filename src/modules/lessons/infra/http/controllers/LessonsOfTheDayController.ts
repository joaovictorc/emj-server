import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLessonsOfTheDayService from '@modules/lessons/services/ListLessonsOfTheDayService';

export default class LessonController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { subjects_id } = req.params;
    const { year, month, day } = req.query;

    const listLessonsOfTheDayService = container.resolve(
      ListLessonsOfTheDayService,
    );

    const lessons = await listLessonsOfTheDayService.execute({
      year,
      month,
      day,
      subjects_id,
    });

    return res.json(lessons);
  }
}
