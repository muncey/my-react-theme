import React from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import parse from "html-react-parser";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title.rendered}</h2>
        <div>
          <PostAuthor userId={post.author} />
          <TimeAgo timestamp={post.date} />
        </div>
        <div className="post-content">{parse(post.content.rendered)}</div>
      </article>
    )
  }

  return <section>{content}</section>
}