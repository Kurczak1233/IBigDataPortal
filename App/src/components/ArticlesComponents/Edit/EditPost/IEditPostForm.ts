import { FieldValues } from "react-hook-form";

export interface IEditPostForm extends FieldValues {
  postId: number;
  title: string;
  description: string;
}
