export interface FileVm {
  base64FileString: string;
  guid: string;
  createdById: number;
  createdOn: Date;
  isDeleted: boolean;
  fileName: string;
  fileType: string;
}
