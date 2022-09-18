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
  cooperationsRoute,
  jobOffersRoute,
  postId,
  postsRoute,
  privacyRoute,
  profileRoute,
  roleContactRoute,
  usersRoute,
  detailsRoute,
  cooperationId,
} from "constants/apiRoutes";
import AdministrationLayout from "pages/AdministrationLayout/AdministrationLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLogic from "./AppLogic";
import { Suspense } from "react";
import React from "react";
import AdminMenuLayout from "components/common/AdminMenu/AdminMenuLayout/AdminMenuLayout";
import MainPageMain from "components/MainPageComponents/Main/MainPageMain";
import ArticleMenuContent from "components/common/ArticleCommonComponents/ArticleMenuContent/ArticleMenuContent";
import ProfilePageMenu from "components/ProfilePageComponents/ProfilePageMenu/ProfillePageMenu";
import CooperationsMenuContent from "components/common/ArticleCommonComponents/CooperationsMenuContent/CooperationsMenuContent";
import MainPage from "./pages/MainPage/MainPage";

import styles from "./App.module.scss";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";

function App() {
  const CreateEduLinkPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Create/EduLinks/CreateEduLinkPage"
      )
  );
  const CreateJobOfferPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Create/JobOffer/CreateJobOfferPage"
      )
  );
  const CreatePostPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Create/Post/CreatePostPage"
      )
  );

  const DashboardPage = React.lazy(
    () => import("pages/AdministrationSubpages/DashboardPage/DashboardPage")
  );
  const CooperationsPage = React.lazy(
    () =>
      import("pages/AdministrationSubpages/CooperationsPage/CooperationsPage")
  );
  const ProfilePage = React.lazy(
    () => import("pages/AdministrationSubpages/ProfilePage/ProfilePage")
  );
  const UsersPage = React.lazy(
    () => import("pages/AdministrationSubpages/UsersPage/UsersPage")
  );
  const AboutPage = React.lazy(
    () => import("pages/MainPage/AboutPage/AboutPage")
  );
  const ContactPage = React.lazy(
    () => import("pages/MainPage/ContactPage/ContactPage")
  );
  const PrivacyPage = React.lazy(
    () => import("pages/MainPage/PrivacyPage/PrivacyPage")
  );
  const RequestRolePage = React.lazy(
    () => import("pages/RequestRolePage/RequestRolePage")
  );

  const ArticlePage = React.lazy(
    () => import("pages/MainPage/ArticlePage/ArticlePage")
  );

  const CooperationsDetailsPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/CooperationsDetailsPage/CooperationsDetailsPage"
      )
  );

  const EduLinksPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Overview/EduLinks/EduLinksPage"
      )
  );
  const JobOffersPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Overview/JobOffers/JobOffersPage"
      )
  );
  const PostsPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Overview/Posts/PostsPage"
      )
  );
  const EditEduLinkPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Edit/EduLinks/EditEduLinkPage"
      )
  );
  const EditJobOfferPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Edit/JobOffers/EditJobOfferPage"
      )
  );
  const EditPostPage = React.lazy(
    () =>
      import(
        "pages/AdministrationSubpages/ArticlesPage/Edit/Posts/EditPostPage"
      )
  );

  const { checkIfRouteIsAuthenticated } = AppLogic();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route
            path={`/${contactRoute}`}
            element={
              <Suspense fallback={<div />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path={`/${privacyRoute}`}
            element={
              <Suspense fallback={<div />}>
                <PrivacyPage />
              </Suspense>
            }
          />
          <Route
            path={`/${aboutRoute}`}
            element={
              <Suspense fallback={<div />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path={`/${articleRoute}/:${articleId}`}
            element={
              <Suspense
                fallback={
                  <div className={styles.artcilePageWrapper}>
                    <BigLoader />
                  </div>
                }
              >
                <ArticlePage />
              </Suspense>
            }
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
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <PostsPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${jobOffersRoute}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <JobOffersPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${eduLinksRoute}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <EduLinksPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${postsRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <EditPostPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${eduLinksRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <EditEduLinkPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${jobOffersRoute}/:${postId}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <EditJobOfferPage />{" "}
                </Suspense>
              )}
            />
            <Route
              path={`${createPostRoute}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <CreatePostPage />
                </Suspense>
              )}
            />
            <Route
              path={`${createJobOfferRoute}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <CreateJobOfferPage />
                </Suspense>
              )}
            />
            <Route
              path={`${createEduLinkRoute}`}
              element={checkIfRouteIsAuthenticated(
                <Suspense fallback={<div />}>
                  <CreateEduLinkPage />
                </Suspense>
              )}
            />
          </Route>
          <Route
            path={`${profileRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route
              path={""}
              element={
                <Suspense fallback={<div />}>
                  <ProfilePage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={`${dashboardRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route
              path={``}
              element={
                <Suspense fallback={<div />}>
                  <DashboardPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={`${usersRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route
              path={``}
              element={
                <Suspense fallback={<div />}>
                  <UsersPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={`${cooperationsRoute}/:${cooperationId}/${detailsRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<ProfilePageMenu />} />
            )}
          >
            <Route
              path={``}
              element={
                <Suspense fallback={<div />}>
                  <CooperationsDetailsPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={`${cooperationsRoute}`}
            element={checkIfRouteIsAuthenticated(
              <AdminMenuLayout menuContent={<CooperationsMenuContent />} />
            )}
          >
            <Route
              path={``}
              element={
                <Suspense fallback={<div />}>
                  <CooperationsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
