import AdminMenuLayout from "components/common/AdminMenu/AdminMenuLayout/AdminMenuLayout";
import ArticleMenuContent from "components/common/ArticleCommonComponents/ArticleMenuContent/ArticleMenuContent";
import {
  administrationRoute,
  articlesRoute,
  createEduLinkRoute,
  createJobOfferRoute,
  createPostRoute,
  dashboardRoute,
  eduLinksRoute,
  errorRoute,
  invitationsRoute,
  jobOffersRoute,
  postId,
  postsRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";
import AdministrationLayout from "pages/AdministrationLayout/AdministrationLayout";
import CreateEduLinkPage from "pages/AdministrationSubpages/ArticlesPage/Create/EduLinks/CreateEduLinkPage";
import CreateJobOfferPage from "pages/AdministrationSubpages/ArticlesPage/Create/JobOffer/CreateJobOfferPage";
import CreatePostPage from "pages/AdministrationSubpages/ArticlesPage/Create/Post/CreatePostPage";
import EditEduLinkPage from "pages/AdministrationSubpages/ArticlesPage/Edit/EduLinks/EditEduLinkPage";
import EditJobOfferPage from "pages/AdministrationSubpages/ArticlesPage/Edit/JobOffers/EditJobOfferPage";
import EditPostPage from "pages/AdministrationSubpages/ArticlesPage/Edit/Posts/EditPostPage";
import EduLinksPage from "pages/AdministrationSubpages/ArticlesPage/Overview/EduLinks/EduLinksPage";
import JobOffersPage from "pages/AdministrationSubpages/ArticlesPage/Overview/JobOffers/JobOffersPage";
import PostsPage from "pages/AdministrationSubpages/ArticlesPage/Overview/Posts/PostsPage";
import DashboardPage from "pages/AdministrationSubpages/DashboardPage/DashboardPage";
import InvitationsPage from "pages/AdministrationSubpages/InvitationsPage/InvitationsPage";
import ProfilePage from "pages/AdministrationSubpages/ProfilePage/ProfilePage";
import UsersPage from "pages/AdministrationSubpages/UsersPage/UsersPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLogic from "./AppLogic";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const { checkIfRouteIsAuthenticated } = AppLogic();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path={`${errorRoute}`} element={<div>X2D</div>} />
        <Route
          path={`${administrationRoute}`}
          element={checkIfRouteIsAuthenticated(<AdministrationLayout />)}
        >
          <Route
            path={`${articlesRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ArticleMenuContent />} />
            )}
          >
            <Route
              path={`${postsRoute}`}
              element={checkIfRouteIsAuthenticated(<PostsPage />)}
            />
            <Route path={`${jobOffersRoute}`} element={<JobOffersPage />} />
            <Route path={`${eduLinksRoute}`} element={<EduLinksPage />} />
            <Route
              path={`${postsRoute}/:${postId}`}
              element={<EditPostPage />}
            />
            <Route
              path={`${eduLinksRoute}/:${postId}`}
              element={<EditEduLinkPage />}
            />
            <Route
              path={`${jobOffersRoute}/:${postId}`}
              element={<EditJobOfferPage />}
            />
            <Route path={`${createPostRoute}`} element={<CreatePostPage />} />
            <Route
              path={`${createJobOfferRoute}`}
              element={<CreateJobOfferPage />}
            />
            <Route
              path={`${createEduLinkRoute}`}
              element={<CreateEduLinkPage />}
            />
          </Route>
          <Route path={`${profileRoute}`} element={<ProfilePage />} />
          <Route path={`${dashboardRoute}`} element={<DashboardPage />} />
          <Route path={`${usersRoute}`} element={<UsersPage />} />
          <Route path={`${invitationsRoute}`} element={<InvitationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
