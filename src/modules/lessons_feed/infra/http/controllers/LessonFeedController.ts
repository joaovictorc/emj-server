import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllLessonStatsService from '@modules/lessons_feed/services/ListAllLessonFeedService';
import ShowLessonStatsService from '@modules/lessonstats/services/ShowLessonStatsService';
import CreateLessonFeedService from '@modules/lessons_feed/services/CreateLessonFeedService';
import DeleteLessonFeedService from '@modules/lessons_feed/services/DeleteLessonsFeedService';
import AppError from '@shared/errors/AppError';

export default class LessonStatsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.query;

    if (!subject_id) {
      throw new AppError('É necessário que você informe a matéria para que possamos listar as atividades')
    }

    const listAllLessonStatsService = container.resolve(
      ListAllLessonStatsService,
    );

    const lessonStats = await listAllLessonStatsService.execute({subject_id});

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
    const { user_id, subject_id, lesson_id, desc, file_url, file_name, file_type } = req.body;

    const createLessonFeedService = container.resolve(
      CreateLessonFeedService,
    );

    const lessonStats = await createLessonFeedService.execute({
      user_id,
      subject_id,
      lesson_id,
      desc,
      file_url,
      file_name,
      file_type
    });

    return res.json(lessonStats);
  }

  public async delete(req: Request, res: Response): Promise<DeleteResponse> {
    const { activityId } = req.params;

    const deleteLessonFeedService = container.resolve(
      DeleteLessonFeedService,
    );

    await deleteLessonFeedService.execute({
      activityId
    });

    return res.status(204).send()
  }
}
