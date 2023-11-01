import { Drawer } from "@material-ui/core";
import { isEqual, isFunction } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { ModalDelete } from "../../../../app/common/_partials/controls/ModalDelete";
import { useSnackNotification } from "../../../../app/layout/_core/SnackNotificationProvider";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  defaultTableOptions,
  getHandlerTableChange,
  getSelectRow,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../common/_helpers";
import {
  Card,
  CardBody,
  LoadingDialog,
  CardHeader,
  CardHeaderToolbar,
} from "../../../common/_partials/controls";
import * as actions from "../redux/productActions";
import ProductNew from "./product-new/ProductNew";
import { ActionsColumnFormatter } from "./ColumnFormatter";
import ProductDetailPage from "./ProductDetailPage";

const ProductListPage = ({ intl }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const snackNotification = useSnackNotification();
  const { listLoading, productList } = useSelector((state) => ({
    listLoading: state.product.listLoading,
    productList: state.product.productList,
  }));
  const [ids, setIds] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [showDialogDeleteProduct, setShowDialogDeleteProduct] = useState(false);
  const [showDialogDeleteListProduct, setShowDialogDeleteListProduct] =
    useState(false);

  const uiEvents = {
    newBtnClick: () => {
      setShowAdd(true);
    },
    openEdit: (product) => {
      setProductDetail(product)
      history.push(`/product/${product._id}/edit`);
    },
    openDetailPage: (product) => {
      setProductDetail(product);
      setShowDetail(true);
    },
    onRowClick: (e, row, rowIndex) => {
      uiEvents.openDetailPage(row);
    },
    toggleDetailPage: (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setShowDetail(open);
    },
    closeDialogDeleteProduct: () => {
      setShowDialogDeleteProduct(false);
      setShowDetail(true);
    },
    showDialogDeleteProduct: () => {
      setShowDialogDeleteProduct(true);
      setShowDetail(false);
    },
  };

  const tableOptions = {
    ...defaultTableOptions,
    filter: {
      name: "",
      description: "",
      code: "",
    },
    sortField: "id",
  };

  const [queryParams, setQueryParamsBase] = useState(tableOptions);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const columns = [
    {
      dataField: "name",
      text: intl.formatMessage({ id: "product_name" }),
      classes: "font-weight-bold",
    },
    {
      dataField: "description",
      text: intl.formatMessage({ id: "product_description" }),
      formatter : (cell) => {
        return <p className="overflow-hidden w-500 text__overflow-ellipsis white__space-nowrap">{cell}</p>
      }
    },
    {
      dataField: "",
      text: "",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEdit: uiEvents.openEdit,
        translate: intl.formatMessage,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        width: "100px",
      },
    },
  ];

  const handleDeleteProduct = () => {
    if (productDetail.id) {
      const payload = {
        productId: productDetail.id,
      };
      dispatch(actions.deleteProductAction(payload)).then((res) => {
        if (res.data.success) {
          snackNotification.showSuccess(
            intl.formatMessage({ id: "common_delete_success" })
          );
          setShowDialogDeleteProduct(false);
          setShowDetail(false);
          loadProducts();
        } else {
          snackNotification.showError(
            intl.formatMessage({ id: "common_delete_error" }) +
              ": " +
              res.data.message
          );
        }
      });
    }
  };

  const handleDeleteListProduct = () => {
    const params = {
      ids: ids,
    };
    dispatch(actions.deleteListProductAction(params)).then((res) => {
      if (res.data.success) {
        snackNotification.showSuccess(
          intl.formatMessage({ id: "common_delete_success" })
        );
        setShowDialogDeleteListProduct(false);
        loadProducts();
        setIds([]);
      } else {
        snackNotification.showError(
          intl.formatMessage({ id: "common_delete_error" }) +
            ": " +
            intl.formatMessage({ id: res.data.message })
        );
      }
    });
  };

  const title =
    ids.length > 0 ? (
      <div className={"d-flex"}>
        <div
          className={
            "d-flex align-items-center mr-5 font-size-base font-weight-normal"
          }
        >
          {`${intl.formatMessage({ id: "common_selected_records_count" })} ${
            ids.length
          }`}
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setShowDialogDeleteListProduct(true)}
        >
          <i className="fa fa-trash"></i>{" "}
          {`${intl.formatMessage({ id: "product_delete_selected" })}`}
        </button>
      </div>
    ) : (
      ""
    );

  const loadProducts = () => {
    dispatch(actions.fetchProductsAction());
  };
  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  return (
    <div>
      <LoadingDialog
        isLoading={listLoading}
        text={intl.formatMessage({ id: "common_loading" })}
      />
      <Card>
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <div className="d-flex align-items-center">
              <Button className="ml-4" onClick={uiEvents.newBtnClick}>
                {intl.formatMessage({ id: "common_add" })}
              </Button>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ModalDelete
            title={intl.formatMessage({ id: "product_delete_modal" })}
            content={intl.formatMessage({
              id: "product_delete_modal_list_item",
            })}
            show={showDialogDeleteListProduct}
            close={() => setShowDialogDeleteListProduct(false)}
            onClick={handleDeleteListProduct}
          />
          <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            hover
            remote
            keyField="_id"
            data={!Array.isArray(productList) ? [] : productList}
            columns={columns}
            rowEvents={{ onClick: uiEvents.onRowClick }}
            onTableChange={getHandlerTableChange(setQueryParams)}
            selectRow={getSelectRow({
              entities: !Array.isArray(productList) ? [] : productList,
              ids: ids,
              setIds: setIds,
              key: "_id",
            })}
          >
            <PleaseWaitMessage
              entities={!Array.isArray(productList) ? [] : productList}
            />
            <NoRecordsFoundMessage
              entities={!Array.isArray(productList) ? [] : productList}
            />
          </BootstrapTable>
        </CardBody>
      </Card>
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor="right"
        open={showDetail}
        onClose={uiEvents.toggleDetailPage(false)}
      >
        <ProductDetailPage
          productDetail={productDetail}
          onClose={uiEvents.toggleDetailPage(false)}
        />
      </Drawer>
      <ProductNew show={showAdd} onHide={() => setShowAdd(false)} />
      <ModalDelete
        title={intl.formatMessage({ id: "product_delete_modal" })}
        content={intl.formatMessage({ id: "product_delete_modal_name" })}
        show={showDialogDeleteProduct}
        close={uiEvents.closeDialogDeleteProduct}
        deleteName={productDetail.name}
        onClick={handleDeleteProduct}
      />
    </div>
  );
};

export default injectIntl(ProductListPage);
