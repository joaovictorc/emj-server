import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLessonsBySubjectIdService from '@modules/lessons/services/ListLessonsBySubjectIdService';

export default class LessonController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.params;

    console.log(subject_id, 'subjectid');

    const listLessonsBySubjectIdService = container.resolve(
      ListLessonsBySubjectIdService,
    );

    const lessons = await listLessonsBySubjectIdService.execute({
      subject_id,
    });

    return res.json(lessons);
  }
}
