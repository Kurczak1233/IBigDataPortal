import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface ICreatePostForm extends FieldValues {
  title: string;
  description: string;
}

export interface ICreatePostRequest {
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
