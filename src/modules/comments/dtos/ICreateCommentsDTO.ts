export default interface ICreateCommentsDTO {
  lesson_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
}
