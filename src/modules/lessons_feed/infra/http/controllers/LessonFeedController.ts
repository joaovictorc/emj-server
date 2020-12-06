import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllLessonStatsService from '@modules/lessons_feed/services/ListAllLessonFeedService';
import ShowLessonStatsService from '@modules/lessonstats/services/ShowLessonStatsService';
import CreateLessonFeedService from '@modules/lessons_feed/services/CreateLessonFeedService';
import AppError from '@shared/errors/AppError';

export default class LessonStatsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.query;

    if (!lesson_id) {
      throw new AppError('É necessário que você informe a matéria para que possamos listar as atividades')
    }

    const listAllLessonStatsService = container.resolve(
      ListAllLessonStatsService,
    );

    const lessonStats = await listAllLessonStatsService.execute({lesson_id});

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
    const { user_id, lesson_id, desc, file_url } = req.body;

    const createLessonFeedService = container.resolve(
      CreateLessonFeedService,
    );

    const lessonStats = await createLessonFeedService.execute({
      user_id,
      lesson_id,
      desc,
      file_url
    });

    return res.json(lessonStats);
  }
}