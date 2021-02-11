import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllClasses from '@modules/class/services/ListAllClasses';
import ShowClassService from '@modules/class/services/ShowClassService';
import CreateClassService from '@modules/class/services/CreateClassService';
import UpdateClassService from '@modules/class/services/UpdateClassService';
import DeleteClassService from '@modules/class/services/DeleteClassService';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export default class ClassController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllClasses = container.resolve(ListAllClasses);

    const dataClasses = await listAllClasses.execute();

    return res.json(dataClasses);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { class_id } = req.params;

    console.log(class_id);

    const showClassService = container.resolve(ShowClassService);

    const dataClasses = await showClassService.execute({ class_id });

    return res.json(dataClasses);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, desc } = req.body;

    const createClassService = container.resolve(CreateClassService);

    const dataClass = await createClassService.execute({
      title,
      desc,
    });

    return res.json(dataClass);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { classId } = req.params;
    const { title, desc } = req.body;

    const updateClassService = container.resolve(UpdateClassService);

    const classData = await updateClassService.execute({
      classId,
      title,
      desc,
    });

    return res.json(classData);
  }

  public async delete(
    req: IGetUserAuthInfoRequest,
    res: Response,
  ): Promise<Response> {
    const user_id = req.user.id;
    const { classId } = req.params;

    console.log(user_id, 'sisi');

    const deleteClassService = container.resolve(DeleteClassService);

    await deleteClassService.execute({ classId, user_id });

    return res.status(204).send();
  }
}
