import { UserRoles } from "enums/UserRoles";
import { FieldValues } from "react-hook-form";

export interface IEditEduLinkForm extends FieldValues {
  eduLinkId: number;
  link: string;
  title: string;
  description: string;
}

export interface IEditEduLinkRequest {
  postId: number;
  title: string;
  commentsPermissions: UserRoles;
  visibilityPermissions: UserRoles;
  description: string;
}
