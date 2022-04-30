import {
  administrationRoute,
  dashboardRoute,
  errorRoute,
  invitationsRoute,
  postsRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";
import AdministrationLayout from "pages/Administration/AdministrationLayout";
import React from "react";
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
          <Route path={`${postsRoute}`} element={<div>Posts</div>} />
          <Route path={`${profileRoute}`} element={<div>Profile</div>} />
          <Route path={`${dashboardRoute}`} element={<div>Dashboard</div>} />
          <Route path={`${usersRoute}`} element={<div>Users</div>} />
          <Route
            path={`${invitationsRoute}`}
            element={<div>Invitations</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
