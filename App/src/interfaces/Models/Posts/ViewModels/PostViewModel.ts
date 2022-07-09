import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

export interface PostViewModel {
  id: number;
  title: string;
  description: string;
  posted: Date;
  userEmail: string;
  files: FileVm[];
}
