import { FieldValues } from "react-hook-form";

export interface ICreateJobOffer extends FieldValues {
  title: string;
  description: string;
  link: string;
}
