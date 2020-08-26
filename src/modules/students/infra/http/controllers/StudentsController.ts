import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllStudents from '@modules/students/services/ListAllStudents';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import UpdateSubjectService from '@modules/subjects/services/UpdateSubjectService';
import DeleteClassService from '@modules/class/services/DeleteClassService';

export default class ClassController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllStudents = container.resolve(ListAllStudents);

    const students = await listAllStudents.execute();

    return res.json(students);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, class_id } = req.body;

    const createStudentService = container.resolve(CreateStudentService);

    const students = await createStudentService.execute({
      user_id,
      class_id,
    });

    return res.json(students);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { subjectId } = req.params;
    const { title } = req.body;

    const updateSubjectService = container.resolve(UpdateSubjectService);

    const subject = await updateSubjectService.execute({
      subjectId,
      title,
    });

    return res.json(subject);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { classId } = req.params;

    console.log(classId);

    const deleteClassService = container.resolve(DeleteClassService);

    await deleteClassService.execute({ classId });

    return res.status(204).send();
  }
}
