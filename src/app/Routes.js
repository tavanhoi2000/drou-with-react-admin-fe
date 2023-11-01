import { Navigate, Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../app/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function RoutesPage() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user,
    }),
    shallowEqual
  );

  return (
    <>
      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Navigate to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </>

    // <Routes>
    //   {!isAuthorized ? (
    //     /*Render auth page when user at `/auth` and not authorized.*/
    //     <Route>
    //       <AuthPage />
    //     </Route>
    //   ) : (
    //     /*Otherwise Navigate to root page (`/`)*/
    //     <Navigate from="/auth" to="/" />
    //   )}

    //   <Route path="/error" component={ErrorsPage} />
    //   <Route path="/logout" component={Logout} />

    //   {!isAuthorized ? (
    //     /*Redirect to `/auth` when user is not authorized*/
    //     <Navigate to="/auth/login" />
    //   ) : (
    //     <Layout>
    //       <BasePage />
    //     </Layout>
    //   )}
    // </Routes>
  );
}
