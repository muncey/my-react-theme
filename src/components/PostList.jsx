import React from 'react';
import classnames from 'classnames';
import PostListItem from './PostListItem';

/**
 * Outputs a page of posts
 */
export default function PostList(props) {
  const containerClassName = classnames('posts-container', { disabled: props.isFetching });
  const renderedPosts = props.posts.map(post => <PostListItem key={post.id} post={post} />);
  return <div className={containerClassName}>{renderedPosts}</div>;
}
