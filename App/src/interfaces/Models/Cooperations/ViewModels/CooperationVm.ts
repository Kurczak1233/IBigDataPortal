export interface CooperationVm {
  id: number;
  isArchived: boolean;
  creatorId: number;
  requestTopic: string;
  description: string;
  createdOn: Date;
  creatorEmail: string;
}
