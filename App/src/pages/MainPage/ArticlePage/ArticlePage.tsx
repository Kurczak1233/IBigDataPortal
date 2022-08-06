import BigButton from "components/common/Buttons/BigButtons/BigButton";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { format } from "date-fns";
import styles from "./ArticlePage.module.scss";
import ArticlePageLogic from "./ArticlePageLogic";
import parse from "html-react-parser";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import ArticlePageCommentsLogic from "./ArticlePageCommentsLogic";
import ArticleComment from "./ArticleComment/ArticleComment";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";

const ArticlePage = () => {
  const {
    article,
    articleFiles,
    componentColour,
    componentIntensiveColour,
    downloadIconOnHover,
    navigateBack,
    downloadFile,
    articleDocuments,
    filesLoading,
    articleComments,
    appUser,
    setArticleComments,
  } = ArticlePageLogic();
  const { control, errors, handleCreateComment, handleSubmit } =
    ArticlePageCommentsLogic(setArticleComments);

  if (!article) {
    return <BigLoader />;
  }
  return (
    <div className={styles.articlePage}>
      <div className={styles.mainContainer}>
        <div
          className={styles.article}
          style={{ backgroundColor: `#${componentColour}` }}
        >
          <title className={styles.title}>{article.title}</title>
          <div
            className={styles.subtitle}
            style={{ color: `#${componentIntensiveColour}` }}
          >
            By{" "}
            {article.nickname === "nickname"
              ? article.userEmail
              : article.nickname}{" "}
            | On {format(new Date(article.posted), "dd/MMMM/yyyy")}
          </div>
          <SeparationSmallBar
            marginTop={"4px"}
            marginBottom={"8px"}
            color={componentIntensiveColour}
          />
          <div>{parse(article.description)}</div>
          {filesLoading ? (
            <BigLoader />
          ) : (
            <>
              {articleDocuments.length > 0 && (
                <>
                  <div className={styles.documentsContainer}>
                    Documents:
                    {articleDocuments.map((document) => {
                      return (
                        <div
                          style={{
                            borderColor: `#${componentIntensiveColour}`,
                          }}
                          className={styles.documents}
                          onClick={() => downloadFile(document)}
                          key={document.guid}
                        >
                          {document.fileName}
                          <img
                            src={downloadIconOnHover}
                            alt={"Download icon"}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.imageContainer}>
                    {articleFiles &&
                      articleFiles.map((item) => {
                        return (
                          <img
                            key={item.guid}
                            src={`data:image/png;base64,${item.base64FileString}`}
                            alt={"User item"}
                          />
                        );
                      })}
                  </div>
                </>
              )}{" "}
            </>
          )}
          {article.commentsPermissions === 0 && articleComments.length === 0 ? (
            <div />
          ) : (
            <div className={styles.comments}>
              <div className={styles.commentsTitle}>Comments</div>
              <div>
                {articleComments.map((item) => {
                  return (
                    <ArticleComment
                      key={item.commentId}
                      comment={item}
                      article={article}
                      componentIntensiveColour={componentIntensiveColour}
                      setArticleComments={setArticleComments}
                    />
                  );
                })}
              </div>
              {appUser && article.commentsPermissions >= appUser?.userRoleId && (
                <>
                  <div className={styles.newComment}>New comment</div>
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
                  <div className={styles.smallButton}>
                    <SmallButton
                      text={"Submit"}
                      onClick={handleSubmit(handleCreateComment)}
                      marginTop={"16px"}
                      color={AvailableIntensiveColors.IntensiveOrange}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.returnButton}>
          <BigButton
            text={"Return"}
            color={componentIntensiveColour}
            onClick={navigateBack}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
