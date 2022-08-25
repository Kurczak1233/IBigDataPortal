import { deleteComment, updateCommentText } from "api/CommentsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { UserRoles } from "enums/UserRoles";
import { ToastModes } from "interfaces/General/ToastModes";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticleComment,
  updateArticleComment,
} from "redux/slices/articlesSlice";
import { RootState } from "redux/store";
import { convertArticleTypeStringToInt } from "../ConvertArticleTypeStringToInt";
import { ICreateCommentForm } from "../ICreateCommentForm";
import { IDeleteCommentRequest } from "./DeleteCommentRequest";
import { IUpdateCommentRequest } from "./UpdateCommentRequest";

const ArticleCommentLogic = (
  comment: CommentVm,
  article: IMergedPosts,
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>
) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isAbleToEditComment, setIsAbleToEditComment] =
    useState<boolean>(false);
  const [itemComment, setItemComment] = useState<CommentVm>(comment);
  const dispatch = useDispatch();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );

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
    const articleTypeId = convertArticleTypeStringToInt(article.type);
    if (articleTypeId === -1) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Article type not found",
      });
    }
    const request: IDeleteCommentRequest = {
      commentId: commentId,
      articleId: article.id,
      articleType: articleTypeId,
    };
    await deleteComment(request);
    await setArticleComments((comments) => {
      const modifiedComments = [...comments];
      const foundCommentIndex = modifiedComments.findIndex(
        (item) => item.commentId === commentId
      );
      if (foundCommentIndex === -1) {
        return modifiedComments;
      }
      modifiedComments.splice(foundCommentIndex, 1);
      return modifiedComments;
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
    const articleTypeId = convertArticleTypeStringToInt(article.type);
    if (articleTypeId === -1) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Article type not found",
      });
    }
    const request: IUpdateCommentRequest = {
      commentId: comment.commentId,
      content: data.content,
      articleId: article.id,
      articleType: articleTypeId,
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

  const handleUserPermissions = useCallback(() => {
    if (!appUser) {
      return setIsAbleToEditComment(false);
    }
    if (appUser.userRoleId === UserRoles.Admin) {
      return setIsAbleToEditComment(true);
    } else if (
      appUser.userRoleId === UserRoles.Employee ||
      appUser.userRoleId === UserRoles.HEI
    ) {
      if (article.creatorId === appUser.id) {
        return setIsAbleToEditComment(true);
      } else if (comment.creatorId === appUser.id) {
        return setIsAbleToEditComment(true);
      } else {
        setIsAbleToEditComment(false);
      }
    } else if (appUser.userRoleId === UserRoles.StudentOrBusiness) {
      if (comment.creatorId === appUser.id) {
        return setIsAbleToEditComment(true);
      } else {
        setIsAbleToEditComment(false);
      }
    }
  }, [appUser, article.creatorId, comment.creatorId]);

  useEffect(() => {
    if (comment) {
      updateComment();
    }
  }, [comment, updateComment]);

  useEffect(() => {
    handleSetQuillContent();
  }, [handleSetQuillContent]);

  useEffect(() => {
    handleUserPermissions();
  }, [handleUserPermissions]);

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
    isAbleToEditComment,
  };
};

export default ArticleCommentLogic;
