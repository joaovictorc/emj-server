import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllLessonStatsService from '@modules/lessonstats/services/ListAllLessonStatsService';
import ShowLessonStatsService from '@modules/lessonstats/services/ShowLessonStatsService';
import CreateLessonStatsService from '@modules/lessonstats/services/CreateLessonStatsService';

export default class LessonStatsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllLessonStatsService = container.resolve(
      ListAllLessonStatsService,
    );

    const lessonStats = await listAllLessonStatsService.execute();

    return res.json(lessonStats);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.params;

    const showLessonStatsService = container.resolve(ShowLessonStatsService);

    const lessonStats = await showLessonStatsService.execute({
      lesson_id,
    });

    return res.json(lessonStats);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, lesson_id } = req.body;

    const createLessonStatsService = container.resolve(
      CreateLessonStatsService,
    );

    const lessonStats = await createLessonStatsService.execute({
      user_id,
      lesson_id,
    });

    return res.json(lessonStats);
  }
}
