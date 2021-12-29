import React from 'react';

/**
 * <Header title subtitle />
 * 
 * @param title - title of the blog
 * @param subtitle - secondary title
 * 
 */
export default function Header(props) {
  return (
    <div className="header-wrapper">
      <header className="container">
        <div className="header-title">
          <h1>{props.title}</h1>
        </div>
      </header>
    </div>
  )

}
