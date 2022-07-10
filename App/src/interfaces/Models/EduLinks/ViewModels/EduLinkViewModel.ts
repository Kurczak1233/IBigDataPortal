import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

export interface EduLinkViewModel {
  title: string;
  link: string;
  id: number;
  description: string;
  posted: Date;
  userEmail: string;
  files: FileVm[];
}
