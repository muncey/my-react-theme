import React from 'react';
import PostByline from './PostByline';
import { Link } from "react-router-dom";

/**
 * Defines the layout for a post list item
 */
export default function PostListItem(props) {
  const post = props.post;
  const views = post ? parseInt(post.meta['post_views'][0]) : 1;
  return (
    <article className="post-excerpt" key={post.id}>
      <div className="post-byline">
        <PostByline userId={post.author} timestamp={post.date} />
      </div>
      <div className="post-details">
        <h3 className="post-title"><Link to={`/posts/${post.id}`}>{post.title.rendered}</Link></h3>
        <div className="post-links">
          <span className="post-views">{views} views</span>
        </div>
      </div>
    </article>    
  )
}
