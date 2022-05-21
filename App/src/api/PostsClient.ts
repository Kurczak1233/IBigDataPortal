import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { ICreatePostForm } from "pages/AdministrationSubpages/PostsPage/Create/Posts/ICreatePostForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Posts = "Posts";

const createPost = async (body: ICreatePostForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Posts}`, base, { body });
};

export { createPost };
