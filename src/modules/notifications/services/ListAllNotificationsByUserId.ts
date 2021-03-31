import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '../repositories/INotificationsRepository';

import Notification from '../infra/typeorm/entities/Notification';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllNotificationsByUserId {
  constructor(
    @inject('NotificationsRepository')
    private notificationsService: INotificationsRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Notification[] | undefined> {
    const notifications = this.notificationsService.findByUserId(user_id);

    return notifications;
  }
}

export default ListAllNotificationsByUserId;
