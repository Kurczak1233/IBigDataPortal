import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

export interface JobOfferViewModel {
  title: string;
  link: string;
  id: number;
  description: string;
  posted: Date;
  userEmail: string;
  files: FileVm[];
  type: string;
  nickname: string;
}
