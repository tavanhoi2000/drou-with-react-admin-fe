import { ContentRoute, LayoutSplashScreen } from "../../../layout";
import React, { Suspense } from "react";
import { Navigate, Routes } from "react-router-dom";
import ProductListPage from "./ProductListPage";
import { ProductEdit } from "./product-edit/ProductEdit";

function ProductPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        {<Navigate exact from="/product" to="/product/list" />}

        <ContentRoute path="/product/list" component={ProductListPage} />
        <ContentRoute path="/product/:id/edit" component={ProductEdit} />
      </Routes>
    </Suspense>
  );
}

export default ProductPage;
