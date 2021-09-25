import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import parse from "html-react-parser";

import { Spinner } from '../../components/Spinner';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';

import { useGetPostsQuery } from '../api/apiSlice';

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title.rendered}</h3>
      <div>
        <PostAuthor userId={post.author} />
        <TimeAgo timestamp={post.date} />      
      </div>
      <div className="post-content">{parse(formatExcerpt(post.excerpt.rendered))}</div>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

function formatExcerpt(excerpt) {
  const pos = excerpt.indexOf('<a class=\"more-link\"');
  return pos > -1 ? excerpt.substring(0, pos) + '</p>' : excerpt;
}

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery(1);

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = posts.map(post => <PostExcerpt key={post.id} post={post} />);
    const containerClassName = classnames('posts-container', {
      disabled: isFetching
    })
    content = <div className={containerClassName}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}