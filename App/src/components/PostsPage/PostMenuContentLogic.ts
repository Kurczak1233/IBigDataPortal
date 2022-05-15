import { IAdminMenuContentArray } from "components/PostsPage/Interfaces/IAdminMenuContentArray";
import { useState } from "react";
import { PostsPageContentsEnum } from "./Enums/PostsPageContentsEnum";

const PostMenuContentLogic = () => {
  const [selectedContent, setSelectedContent] = useState<PostsPageContentsEnum>(
    PostsPageContentsEnum.Posts
  );

  const handleChangeState = (selectedEnum: PostsPageContentsEnum) => {
    setSelectedContent(selectedEnum);
  };

  const adminMenuNavigationOverviewContents: IAdminMenuContentArray<PostsPageContentsEnum> =
    {
      sectionName: "Overview",
      items: [
        {
          itemName: "Posts",
          switchTo: PostsPageContentsEnum.Posts,
          isActive: selectedContent === PostsPageContentsEnum.Posts,
        },
        {
          itemName: "Job offers",
          switchTo: PostsPageContentsEnum.JobOffers,
          isActive: selectedContent === PostsPageContentsEnum.JobOffers,
        },
        {
          itemName: "Edu links",
          switchTo: PostsPageContentsEnum.EduLinks,
          isActive: selectedContent === PostsPageContentsEnum.EduLinks,
        },
      ],
    };

  const adminMenuNavigationCreateContents: IAdminMenuContentArray<PostsPageContentsEnum> =
    {
      sectionName: "Create",
      items: [
        {
          itemName: "Post",
          switchTo: PostsPageContentsEnum.CreatePost,
          isActive: selectedContent === PostsPageContentsEnum.CreatePost,
        },
        {
          itemName: "Job offer",
          switchTo: PostsPageContentsEnum.CreateJobOffer,
          isActive: selectedContent === PostsPageContentsEnum.CreateJobOffer,
        },
        {
          itemName: "Edu link",
          switchTo: PostsPageContentsEnum.CreateEduLink,
          isActive: selectedContent === PostsPageContentsEnum.CreateEduLink,
        },
      ],
    };

  return {
    handleChangeState,
    selectedContent,
    adminMenuNavigationOverviewContents,
    adminMenuNavigationCreateContents,
  };
};

export default PostMenuContentLogic;
