import { deleteComment, updateCommentText } from "api/CommentsClient";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICreateCommentForm } from "../ICreateCommentForm";
import { IUpdateCommentRequest } from "./UpdateCommentRequest";

const ArticleCommentLogic = (
  comment: CommentVm,
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>
) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemComment, setItemComment] = useState<CommentVm>(comment);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentForm>();

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteComment = async (commentId: number) => {
    setArticleComments((comments) => {
      const foundCommentIndex = comments.findIndex(
        (item) => item.commentId === commentId
      );
      if (foundCommentIndex === -1) {
        return comments;
      }
      comments.splice(foundCommentIndex, 1);
      return [...comments];
    });
    setIsDeleteModalOpen(false);
    await deleteComment(commentId);
  };

  const handleEditComment = () => {
    setEditMode(true);
  };

  const handleSetQuillContent = useCallback(() => {
    setValue("content", comment.content);
  }, [comment.content, setValue]);

  const updateCommentContent = async (data: ICreateCommentForm) => {
    setItemComment((oldComment) => {
      oldComment.content = data.content;
      return oldComment;
    });
    setEditMode(false);
    const request: IUpdateCommentRequest = {
      commentId: comment.commentId,
      content: data.content,
    };
    await updateCommentText(request);
  };

  const updateComment = useCallback(() => {
    setItemComment(comment);
  }, [comment]);

  useEffect(() => {
    if (comment) {
      updateComment();
    }
  }, [comment, updateComment]);

  useEffect(() => {
    handleSetQuillContent();
  }, [handleSetQuillContent]);

  return {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleEditComment,
    handleDeleteComment,
    handleOpenDeleteModal,
    updateCommentContent,
    handleSubmit,
    control,
    errors,
    editMode,
    itemComment,
  };
};

export default ArticleCommentLogic;
