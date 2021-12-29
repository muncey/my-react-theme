import React from 'react';

/**
 * Pagination control
 */
export function Pagination(props) {
  const page = props.page;
  const totalPages = props.totalPages;
  const setPage = props.setPage;
  return (<div className="blog-pagination mb-3 mt-3 d-flex flex-row justify-content-between">
      <button disabled={page === 1} className="btn btn-secondary" onClick={() => setPage(page - 1)}>Prev</button>
      <div className="pl-5">Page {page} of {totalPages}</div>
      <button disabled={page === totalPages} className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>
    </div>);
}

/**
 * Empty pagination control
 */
export function EmptyPagination() {
  return (<div></div>);
}