import React from 'react';
import parse from "html-react-parser";

/**
 * <BlogArticle title content author date format />
 * 
 * @param title - title of the article
 * @param content - content of the article
 * @param author - author of the article
 * @param date - published date of the article
 * @param tags - tags for the article
 * @param commentsCount - count of comments
 * @param format - markdown or text
 */
export default function BlogArticle(props) {
  return (
    <article className="article">
      <div className="article-title">
        <h2>{props.title}</h2>
      </div>
      <div className="byline">
        <div className="byline-author">
        Written by <span>{props.author}</span>
        </div>
        <div className="byline-date">
        on 
        </div>
        <div className="byline-tags">
        in <span>{props.tags}</span>
        </div>
        <div className="byline-comments-count">
        with <span>{props.commentsCount}</span>
        </div>
      </div>
      <div className="article-content">
        {parse(props.content)}
      </div>
      <div className="share">
        Share: -to-do: show article        
      </div>
    </article>
  )

}