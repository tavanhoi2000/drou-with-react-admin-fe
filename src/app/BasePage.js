import React, { Suspense, lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { LayoutSplashScreen } from "../app/layout";

const routes = [
  {
    path: "/dashboard"
  },
  {
    path: "/product",
    component: lazy(() => import("./modules/Product/pages/ProductPage")),
  },

];

export default function BasePage() {

console.log(1);
          <Navigate to="/product" />

//   return (
//     <Suspense fallback={<LayoutSplashScreen />}>
//       <Routes>
//         {
//           /* Redirect from root URL to /dashboard. */
//           <Navigate exact from="/" to="/product" />
//         }
//         {routes.map((route) => {
//           return (
//             <Route
//               key={route.path}
//               path={route.path}
//               component={route.component}
//             />
//           );
//         })}

//         <Navigate to="error/error-v1" />
//       </Routes>
//     </Suspense>
//   );
}
