import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface IEditPostForm extends FieldValues {
  postId: number;
  title: string;
  description: string;
}

export interface IEditPostRequest {
  postId: number;
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
