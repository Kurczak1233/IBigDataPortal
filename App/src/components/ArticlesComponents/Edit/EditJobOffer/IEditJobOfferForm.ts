import { FieldValues } from "react-hook-form";

export interface IEditJobOfferForm extends FieldValues {
  jobOfferId: number;
  link: string;
  title: string;
  description: string;
}
