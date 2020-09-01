import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllSubjects from '@modules/subjects/services/ListAllSubjects';
import ShowSubjectService from '@modules/subjects/services/ShowSubjectService';
import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import UpdateSubjectService from '@modules/subjects/services/UpdateSubjectService';
import DeleteSubjectsService from '@modules/subjects/services/DeleteSubjectsService';

export default class ClassController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllSubjects = container.resolve(ListAllSubjects);

    const subjects = await listAllSubjects.execute();

    return res.json(subjects);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.params;

    const showSubjectService = container.resolve(ShowSubjectService);

    const subject = await showSubjectService.execute({ subject_id });

    return res.json(subject);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { class_id, user_id, title, emoji, color } = req.body;

    const createSubjectService = container.resolve(CreateSubjectService);

    const subjects = await createSubjectService.execute({
      class_id,
      user_id,
      title,
      emoji,
      color,
    });

    return res.json(subjects);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { subjectId } = req.params;
    const { title, emoji, color, class_id } = req.body;

    const updateSubjectService = container.resolve(UpdateSubjectService);

    const subject = await updateSubjectService.execute({
      subjectId,
      title,
      emoji,
      color,
      class_id,
    });

    return res.json(subject);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { subject_id } = req.params;

    const deleteSubjectsService = container.resolve(DeleteSubjectsService);

    await deleteSubjectsService.execute({ subject_id });

    return res.status(204).send();
  }
}
