import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface IEditJobOfferForm extends FieldValues {
  jobOfferId: number;
  link: string;
  title: string;
  description: string;
}

export interface IEditJobOfferRequest {
  postId: number;
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
