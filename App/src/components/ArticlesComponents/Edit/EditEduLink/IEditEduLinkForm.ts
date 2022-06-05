import { FieldValues } from "react-hook-form";

export interface IEditEduLinkForm extends FieldValues {
  eduLinkId: number;
  link: string;
  title: string;
  description: string;
}
