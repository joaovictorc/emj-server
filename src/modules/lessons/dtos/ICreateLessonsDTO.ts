export default interface ICreateLessonsDTO {
  subjects_id: string;
  class_id: string;
  title: string;
  desc: string;
  schedule_time: date;
  date: date;
  youtube_url: string;
}
