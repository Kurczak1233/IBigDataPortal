import { IEditPostForm } from "components/ArticlesComponents/Edit/EditPost/IEditPostForm";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { ICreatePostForm } from "pages/AdministrationSubpages/ArticlesPage/Create/Post/ICreatePostForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Posts = "Posts";

const getAllPosts = async (): Promise<PostViewModel[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Posts}`, base);
};

const createPost = async (body: ICreatePostForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Posts}`, base, { body });
};

const editPost = async (body: IEditPostForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Posts}`, base, { body });
};

export { getAllPosts, createPost, editPost };
