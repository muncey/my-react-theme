import React, { useState } from 'react';
import PostList from './PostList';
import Spinner from './Spinner';
import { Pagination, EmptyPagination } from './Pagination';
import { useGetPostsQuery } from '../app/apiSlice';

export default function PagedPostList() {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery(page);

  const posts = data?.posts || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  const pagination = (data) ? 
    <Pagination page={page} total={total} totalPages={totalPages} setPage={setPage} /> : 
    <EmptyPagination />;
  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = <PostList posts={posts} isFetching={isFetching} />;
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  return (
    <section className="posts-list">
      {content}
      {pagination}
    </section>
  )  
}
