export default interface ICreateLessonFeedDTO {
  subject_id: string;
  lesson_id: string;
  user_id: string;
  desc: string;
  file_url: string;
  file_name: string;
  file_type: string;
}
