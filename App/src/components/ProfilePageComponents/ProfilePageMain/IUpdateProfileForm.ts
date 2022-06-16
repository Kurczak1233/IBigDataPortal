import { FieldValues } from "react-hook-form";

export interface IUpdateProfileForm extends FieldValues {
  name: string;
  nickname: string;
}
