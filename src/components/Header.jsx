import React from 'react';

/**
 * <Header title subtitle />
 * 
 * @param title - title of the blog
 * @param subtitle - secondary title
 * 
 */
export const Header = (props) => {
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

