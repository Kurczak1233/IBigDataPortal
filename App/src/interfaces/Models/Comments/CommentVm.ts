export interface CommentVm {
  commentId: number;
  content: string;
  createdOn: Date | string;
  commentatorEmail: string;
  commentatorNickname: string;
}
