import { createComment } from "api/CommentsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import {
  ICreateCommentForm,
  ICreateCommentRequest,
} from "./ICreateCommentForm";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setChosenArticleComments } from "redux/slices/articlesSlice";
import { convertArticleTypeStringToInt } from "./ConvertArticleTypeStringToInt";

const ArticlePageCommentsLogic = (
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>
) => {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentForm>();
  const dispatch = useDispatch();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer
  );
  const article = useSelector(
    (state: RootState) => state.articlesReducer.chosenArticle
  );

  const handleCreateComment = async (data: ICreateCommentForm) => {
    if (isHtmlStringEmpty(data.content)) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "You cannot post an empty comment",
      });
    }
    if (!article) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Article was not found",
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
      const newComment: CommentVm = {
        commentId: newCommentId,
        content: data.content,
        createdOn: new Date(),
        commentatorEmail: appUser.user.email,
        commentatorNickname: appUser.user.nickname,
      };
      let updatedComments: CommentVm[] = [];
      await setArticleComments((oldItems) => {
        const mergedComments = [...oldItems, newComment];
        updatedComments = mergedComments;
        return mergedComments;
      });
      const mappedObject = updatedComments.map((item) => {
        return { ...item, createdOn: item.createdOn.toString() };
      });
      dispatch(setChosenArticleComments(mappedObject));
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
