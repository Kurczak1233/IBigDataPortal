import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface ICreateJobOffer extends FieldValues {
  title: string;
  description: string;
}
export interface ICreateJobOfferRequest {
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
