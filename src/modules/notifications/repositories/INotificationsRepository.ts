import Notification from '../infra/typeorm/entities/Notification';
import ICreateNotificationsDTO from '../dtos/ICreateNotificationsDTO';

export default interface INotificationsRepository {
  findByUserId(user_id: string): Promise<Notification[] | undefined>;
  create(data: ICreateNotificationsDTO): Promise<Notification>;
  save(data: Notification): Promise<Notification>;
}
