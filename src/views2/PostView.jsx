import React from 'react'
import { useParams } from "react-router-dom";
import { useGetPostQuery } from '../app/apiSlice'
import Spinner from '../components/Spinner'
import PostByline from '../components/PostByline'
import parse from "html-react-parser";

function formatPost(post) {
  const rendered = post.content.rendered;
  let result = rendered.replace(/\<code\>/g, '<code class="prettyprint">');
  const parsed = parse(result);
  return parsed;
}

export default function SinglePostPage() {
  const params = useParams();
  const postId = params.postId;

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);
  const views = post ? parseInt(post.meta['post_views'][0]) : 1;

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title.rendered}</h2>
        <div>
          <PostByline userId={post.author} timestamp={post.date} views={views} />
        </div>
        <div className="post-content">{formatPost(post)}</div>
        <div className="post-links">
          <span className="post-views">{views} views</span>
        </div>
      </article>
    )

    window.setTimeout(() => PR.prettyPrint(), 300);
  }

  return <section>{content}</section>
}
