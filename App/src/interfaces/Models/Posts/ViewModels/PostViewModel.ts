import { UserRoles } from "enums/UserRoles";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

export interface PostViewModel {
  id: number;
  title: string;
  description: string;
  posted: Date;
  userEmail: string;
  files: FileVm[];
  type: string;
  creatorId: number;
  commentsPermissions: UserRoles;
  articleVisibilityPermissions: UserRoles;
  nickname: string;
  comments: CommentVm[];
}
