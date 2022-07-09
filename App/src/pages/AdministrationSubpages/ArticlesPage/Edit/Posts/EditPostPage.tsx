import EditFileComponent from "components/ArticlesComponents/ArticlesFiles/EditFileComponent/EditFileComponent";
import EditPost from "components/ArticlesComponents/Edit/EditPost/EditPost";
import PostsHeader from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsHeader/PostsHeader";
import PostItem from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsItems/PostItem/PostItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EditPostPage.module.scss";
import EditPostPageLogic from "./EditPostPageLogic";

const EditPostPage = () => {
  const { state, postFiles, setPostFiles } = EditPostPageLogic();
  return (
    <div>
      <AdministartionPageHeader pageTitle={"Edit post"} />
      <PostsHeader iconsColour={AvailableIntensiveColors.IntensiveOrange} />
      <PostItem
        post={state}
        postsColor={AvailableIntensiveColors.LessIntensiveOrange}
        interactive={false}
      />
      <div className={styles.formsContainer}>
        <div className={styles.formWrapper}>
          <EditPost
            post={state}
            postFiles={postFiles.map((item) => item.file)}
          />
        </div>
        <EditFileComponent
          setPostsFiles={setPostFiles}
          postFiles={postFiles}
          module={FileModuleEnum.postsFiles}
        />
      </div>
    </div>
  );
};

export default EditPostPage;
