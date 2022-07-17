import AdminMenuLayout from "components/common/AdminMenu/AdminMenuLayout/AdminMenuLayout";
import ArticleMenuContent from "components/common/ArticleCommonComponents/ArticleMenuContent/ArticleMenuContent";
import MainPageMain from "components/MainPageComponents/Main/MainPageMain";
import ProfilePageMenu from "components/ProfilePageComponents/ProfilePageMenu/ProfillePageMenu";
import {
  aboutRoute,
  administrationRoute,
  articleId,
  articleRoute,
  articlesRoute,
  contactRoute,
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
  privacyRoute,
  profileRoute,
  roleContactRoute,
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
import AboutPage from "pages/MainPage/AboutPage/AboutPage";
import ArticlePage from "pages/MainPage/ArticlePage/ArticlePage";
import ContactPage from "pages/MainPage/ContactPage/ContactPage";
import PrivacyPage from "pages/MainPage/PrivacyPage/PrivacyPage";
import RequestRolePage from "pages/RequestRolePage/RequestRolePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLogic from "./AppLogic";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const { checkIfRouteIsAuthenticated } = AppLogic();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path={`/${contactRoute}`} element={<ContactPage />} />
          <Route path={`/${privacyRoute}`} element={<PrivacyPage />} />
          <Route path={`/${aboutRoute}`} element={<AboutPage />} />
          <Route
            path={`/${articleRoute}/:${articleId}`}
            element={<ArticlePage />}
          />
          <Route path={`/`} element={<MainPageMain />} />
        </Route>
        <Route path={`${roleContactRoute}`} element={<RequestRolePage />} />
        <Route path={`${errorRoute}`} element={<div>Error page</div>} />
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
            <Route
              path={`${jobOffersRoute}`}
              element={checkIfRouteIsAuthenticated(<JobOffersPage />)}
            />
            <Route
              path={`${eduLinksRoute}`}
              element={checkIfRouteIsAuthenticated(<EduLinksPage />)}
            />
            <Route
              path={`${postsRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(<EditPostPage />)}
            />
            <Route
              path={`${eduLinksRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(<EditEduLinkPage />)}
            />
            <Route
              path={`${jobOffersRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(<EditJobOfferPage />)}
            />
            <Route
              path={`${createPostRoute}`}
              element={checkIfRouteIsAuthenticated(<CreatePostPage />)}
            />
            <Route
              path={`${createJobOfferRoute}`}
              element={checkIfRouteIsAuthenticated(<CreateJobOfferPage />)}
            />
            <Route
              path={`${createEduLinkRoute}`}
              element={checkIfRouteIsAuthenticated(<CreateEduLinkPage />)}
            />
          </Route>
          <Route
            path={`${profileRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route path={""} element={<ProfilePage />} />
          </Route>
          <Route
            path={`${dashboardRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route path={``} element={<DashboardPage />} />
          </Route>
          <Route
            path={`${usersRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route path={``} element={<UsersPage />} />
          </Route>

          <Route
            path={`${invitationsRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route path={``} element={<InvitationsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
