import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as socketIo from 'socket.io';

import ListAllLessons from '@modules/lessons/services/ListAllLessons';
import ShowLessonService from '@modules/lessons/services/ShowLessonService';
import CreateLessonsService from '@modules/lessons/services/CreateLessonsService';
import UpdateLessonsService from '@modules/lessons/services/UpdateLessonsService';
import DeleteClassService from '@modules/class/services/DeleteClassService';

export interface ISocket extends Request {
  user: {
    id: string;
  };
  io: socketIo.Server;
  connectedUsers: {};
}

export default class LessonController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.params;

    const showLessonService = container.resolve(ShowLessonService);

    const lessons = await showLessonService.execute({ lesson_id });

    return res.json(lessons);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAllLessons = container.resolve(ListAllLessons);

    const lessons = await listAllLessons.execute();

    return res.json(lessons);
  }

  public async create(req: ISocket, res: Response): Promise<Response> {
    const {
      subjects_id,
      class_id,
      title,
      desc,
      schedule_time,
      date,
      youtube_url,
    } = req.body;

    const createLessonsService = container.resolve(CreateLessonsService);

    const lessons = await createLessonsService.execute({
      subjects_id,
      class_id,
      title,
      desc,
      schedule_time,
      date,
      youtube_url,
    });

    // const ownerSocket = req.connectedUsers[req.user.id];

    // console.log(req.connectedUsers[req.user.id], 'connected');

    // if (ownerSocket) {
    req.io.to(class_id).emit('lessons', lessons);
    // }

    return res.json(lessons);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.params;
    const { title, desc, youtube_url, date } = req.body;

    console.log(lesson_id, title, desc, youtube_url, date, 'recebiiiii');

    const updateLessonsService = container.resolve(UpdateLessonsService);

    const lesson = await updateLessonsService.execute({
      lesson_id,
      title,
      desc,
      youtube_url,
      date,
    });

    return res.json(lesson);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { classId } = req.params;

    console.log(classId);

    const deleteClassService = container.resolve(DeleteClassService);

    await deleteClassService.execute({ classId });

    return res.status(204).send();
  }
}
