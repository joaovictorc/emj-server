import { getRepository, Repository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

import Notification from '../entities/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  public async findByUserId(
    user_id: string,
  ): Promise<Notification[] | undefined> {
    const notification = await this.ormRepository.find({
      where: { recipient_id: user_id },
    });

    return notification;
  }

  public async create(
    notification_data: ICreateNotificationsDTO,
  ): Promise<Notification> {
    const notification = await this.ormRepository.create(notification_data);

    await this.ormRepository.save(notification);

    return notification;
  }

  public async save(notification: Notification): Promise<Notification> {
    return this.ormRepository.save(notification);
  }
}

export default NotificationsRepository;
