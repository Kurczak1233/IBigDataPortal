import { FieldValues } from "react-hook-form";

export interface ICreatePostForm extends FieldValues {
  title: string;
  description: string;
}
