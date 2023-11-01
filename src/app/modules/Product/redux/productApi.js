import { getApi, postApi, deleteApi } from "../../../../redux/api";

const endpointProduct = "/admin/product"

export function getAllProducts() {
  return getApi(endpointProduct)
}

export function createProduct(params) {
  const bodyData = {...params}
  return postApi(endpointProduct, bodyData)
}

export function updateProduct(params) {
  const requestBody = {...params}
  return postApi(endpointProduct + `/${params.productId}`, requestBody)
}

export function getProductById(params) {
  return getApi(endpointProduct + `/${params.productId}`)
}

export function deleteProduct(params) {
  return deleteApi(endpointProduct + params.productId)
}


export function deleteListProduct(params) {
  var bodyFormData = new FormData();
  const iids = params.ids;
  if (iids.length > 0) {
    for (var key in iids) {
      bodyFormData.append(`ids[${key}]`, iids[key]);
    }
  }

  return deleteApi(endpointProduct + `/${iids[key]}`)
}
