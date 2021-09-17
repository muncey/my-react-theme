import React from 'react';

/**
 * <BlogHeader title subtitle />
 * 
 * @param title - title of the blog
 * @param subtitle - secondary title
 * 
 */
export default function BlogHeader(props) {
  return (
    <header>
      <div className="header-title">
        <h1>{props.title}</h1>
      </div>
      <div className="header-subtitle">
        <p>{props.subtitle}</p>
      </div>
    </header>
  )

}

