import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import parse from "html-react-parser";
import styles from "./ArticleComment.module.scss";
import { standarizedFormatWithTime } from "constants/dateFormats";
import { format } from "date-fns";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import ArticleCommentLogic from "./ArticleCommentLogic";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";

interface IArticleComment {
  comment: CommentVm;
  componentIntensiveColour: AvailableIntensiveColors;
  setArticleComments: React.Dispatch<React.SetStateAction<CommentVm[]>>;
  article: IMergedPosts;
}

const ArticleComment = ({
  comment,
  componentIntensiveColour,
  setArticleComments,
  article,
}: IArticleComment) => {
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteComment,
    handleEditComment,
    handleOpenDeleteModal,
    handleSubmit,
    updateCommentContent,
    control,
    errors,
    editMode,
    itemComment,
    isAbleToEditComment,
  } = ArticleCommentLogic(comment, article, setArticleComments);
  return (
    <div className={styles.comment}>
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteModalOpen}
        description={"delete this comment"}
        handleConfirmAction={() => handleDeleteComment(itemComment.commentId)}
      />
      <div className={styles.commentHeader}>
        {itemComment.commentatorNickname === "nickname"
          ? itemComment.commentatorEmail
          : itemComment.commentatorNickname}
        {isAbleToEditComment && (
          <div className={styles.rightSide}>
            <div className={styles.buttons}>
              <SmallButton
                text={editMode ? "Save" : "Edit"}
                width={"75px"}
                marginLeft={"16px"}
                onClick={
                  editMode
                    ? handleSubmit(updateCommentContent)
                    : handleEditComment
                }
                color={componentIntensiveColour}
              />
              <SmallButton
                text={"Delete"}
                width={"75px"}
                marginLeft={"16px"}
                onClick={handleOpenDeleteModal}
                color={AvailableIntensiveColors.IntensiveRed}
              />
            </div>
            <span className={styles.date}>
              {format(
                new Date(itemComment.createdOn),
                standarizedFormatWithTime
              )}
            </span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        {editMode ? (
          <div className={styles.editContent}>
            <Controller
              control={control}
              name="content"
              rules={{ required: true }}
              render={({ field: { onChange, value: text } }) => (
                <ReactQuill
                  style={{ width: "100%" }}
                  value={text ? text : ""}
                  onChange={onChange}
                />
              )}
            />
            {errors.content && (
              <span className={styles.error}>
                You are not allowed to submit empty comments
              </span>
            )}
          </div>
        ) : (
          <> {parse(itemComment.content)}</>
        )}
      </div>
    </div>
  );
};

export default ArticleComment;
