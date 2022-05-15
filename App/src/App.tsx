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
  postsRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";
import AdministrationLayout from "pages/AdministrationLayout/AdministrationLayout";
import DashboardPage from "pages/AdministrationSubpages/DashboardPage/DashboardPage";
import InvitationsPage from "pages/AdministrationSubpages/InvitationsPage/InvitationsPage";
import PostsPage from "pages/AdministrationSubpages/PostsPage/PostsPage";
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
          <Route path={`${articlesRoute}`} element={<PostsPage />}>
            <Route path={`${postsRoute}`} element={<PostsPage />} />
            <Route path={`${jobOffersRoute}`} element={<PostsPage />} />
            <Route path={`${eduLinksRoute}`} element={<PostsPage />} />
            <Route path={`${createPostRoute}`} element={<PostsPage />} />
            <Route path={`${createJobOfferRoute}`} element={<PostsPage />} />
            <Route path={`${createEduLinkRoute}`} element={<PostsPage />} />
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
