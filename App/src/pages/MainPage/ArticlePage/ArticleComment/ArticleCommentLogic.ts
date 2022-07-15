import { deleteComment, updateCommentText } from "api/CommentsClient";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  deleteArticleComment,
  updateArticleComment,
} from "redux/slices/articlesSlice";
import { ICreateCommentForm } from "../ICreateCommentForm";
import { IUpdateCommentRequest } from "./UpdateCommentRequest";

const ArticleCommentLogic = (
  comment: CommentVm,
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>
) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemComment, setItemComment] = useState<CommentVm>(comment);
  const dispatch = useDispatch();
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
    dispatch(deleteArticleComment(commentId));
    await deleteComment(commentId);
    await setArticleComments((comments) => {
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
  };

  const handleEditComment = () => {
    setEditMode(true);
  };

  const handleSetQuillContent = useCallback(() => {
    setValue("content", comment.content);
  }, [comment.content, setValue]);

  const updateCommentContent = async (data: ICreateCommentForm) => {
    const request: IUpdateCommentRequest = {
      commentId: comment.commentId,
      content: data.content,
    };
    await updateCommentText(request);
    dispatch(updateArticleComment(request));
    await setItemComment((oldComment) => {
      oldComment.content = data.content;
      return oldComment;
    });
    setEditMode(false);
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
