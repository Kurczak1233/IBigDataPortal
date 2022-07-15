import { createComment } from "api/CommentsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { ArticlesTypesNumbers } from "enums/ArticlesTypesNumbers";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  ICreateCommentForm,
  ICreateCommentRequest,
} from "./ICreateCommentForm";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const ArticlePageCommentsLogic = (
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>
) => {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentForm>();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer
  );
  const location = useLocation();
  const article = location.state as IMergedPosts;

  const convertArticleTypeStringToInt = (articleType: string): number => {
    switch (articleType) {
      case ArticlesTypes.Post: {
        return ArticlesTypesNumbers.Post;
      }
      case ArticlesTypes.JobOffer: {
        return ArticlesTypesNumbers.JobOffer;
      }
      case ArticlesTypes.EduLink: {
        return ArticlesTypesNumbers.EduLink;
      }
      default:
        return -1;
    }
  };

  const handleCreateComment = async (data: ICreateCommentForm) => {
    if (isHtmlStringEmpty(data.content)) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "You cannot post an empty comment",
      });
    }
    const articleTypeId = convertArticleTypeStringToInt(article.type);
    if (articleTypeId === -1) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Article type not found",
      });
    }
    const request: ICreateCommentRequest = {
      content: data.content,
      articleId: article.id,
      articleType: articleTypeId,
    };
    try {
      const newCommentId = await createComment(request);
      if (!appUser.user) {
        return SyncToast({
          mode: ToastModes.Info,
          description: "User was not found",
        });
      }
      const newArticle: CommentVm = {
        commentId: newCommentId,
        content: data.content,
        createdOn: new Date(),
        commentatorEmail: appUser.user.email,
        commentatorNickname: appUser.user.nickname,
      };
      setArticleComments((oldItems) => {
        return [...oldItems, newArticle];
      });
    } catch {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Creating comment went wrong",
      });
    }
    setValue("content", "");
  };
  return { control, errors, handleCreateComment, handleSubmit };
};

export default ArticlePageCommentsLogic;
