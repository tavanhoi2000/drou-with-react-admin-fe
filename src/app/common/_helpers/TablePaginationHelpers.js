/* Pagination Helprs */
import React from "react";

export const getPagesCount = (totalSize, sizePerPage) => {
  return Math.ceil(totalSize / sizePerPage);
};

export const getPages = (page, pagesCount, paginationSize) => {
  const result = [];
  if (!page) {
    return result;
  }

  if (pagesCount === 1) {
    result.push(1);
    return result;
  }

  if (pagesCount < page) {
    return result;
  }

  if (pagesCount < paginationSize + 1) {
    for (let i = 1; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (page === 1) {
    for (let i = 1; i < paginationSize + 1; i++) {
      if (i < pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  if (page === pagesCount) {
    for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++) {
      if (i <= pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  const shiftCount = Math.floor(paginationSize / 2);
  if (shiftCount < 1) {
    result.push(page);
    return result;
  }

  //
  if (page < shiftCount + 2) {
    for (let i = 1; i < paginationSize + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (pagesCount - page < shiftCount + 2) {
    for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  for (let i = page - shiftCount; i < page; i++) {
    if (i > 0) {
      result.push(i);
    }
  }
  result.push(page);
  for (let i = page + 1; i < page + shiftCount + 1; i++) {
    if (i <= pagesCount) {
      result.push(i);
    }
  }

  return result;
};

export function getHandlerTableChange(setQueryParams) {
  return (type, { page, sizePerPage, sortField, sortOrder, data }) => {
    const pageNumber = page || 1;
    setQueryParams((prev) =>
      type === "sort"
        ? { ...prev, sortOrder, sortField }
        : type === "pagination"
        ? { ...prev, pageNumber, pageSize: sizePerPage }
        : prev
    );
  };
}

export function PleaseWaitMessage({ entities }) {
  return <>{entities === null && <div>Please wait...</div>}</>;
}

export function NoRecordsFoundMessage({ entities, customMessage }) {
  const list = (entities === null || entities === undefined) ? [] : entities;
  return (
    <>
      {list.length === 0 && entities !== null && (
        <div>{ customMessage? customMessage : 'No records found'}</div>
      )}
    </>
  );
}


export const defaultTableOptions = {
  custom: true,
  totalSize: 0,
  sizePerPageList: [
    { text: "10", value: 10 },
    { text: "20", value: 20 }
  ],
  pageSize: 10,
  pageNumber: 1,
  paginationSize: 3,
  showTotal: true,
  paginationTotalRenderer: (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Hiển thị { from } đến { to }/<b>{ size }</b> Kết quả
    </span>
  )
};