export interface CommentVm {
  commentId: number;
  content: string;
  createdOn: Date | string;
  creatorId: number;
  commentatorEmail: string;
  commentatorNickname: string;
}
