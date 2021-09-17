import React from 'react';
import { Link } from "react-router-dom";
/**
 * <BlogNav />
 * 
 */
export default function BlogNav(props) {
  return (
      <nav>
        <ul className="nav">
          <li className="nav-item"><Link to="/">Posts</Link></li>
          <li className="nav-item"><Link to="/home">Home</Link></li>
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/page">Page</Link></li>
          <li className="nav-item"><Link to="/post">Post</Link></li>
          <li className="nav-item"><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
  )

}

