import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface ICreateEduLink extends FieldValues {
  title: string;
  description: string;
}

export interface ICreateEduLinkRequest {
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
