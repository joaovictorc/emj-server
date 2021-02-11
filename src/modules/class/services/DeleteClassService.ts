import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClassRepository from '../repositories/IClassRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  classId: string;
  user_id: string;
}

@injectable()
class DeleteClassService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ classId, user_id }: IRequest): Promise<void> {
    const getUser = await this.userRepository.findById(user_id);

    if (getUser.rule !== 'admin') {
      throw new AppError('Você não tem permissão para deletar turmas.', 403);
    }

    const classData = await this.classRepository.findById(classId);

    if (!classData) {
      throw new AppError(
        'A turma que você está tentando deletar não existe nos registros.',
        404,
      );
    }

    await this.classRepository.delete(classData.id);
  }
}

export default DeleteClassService;
