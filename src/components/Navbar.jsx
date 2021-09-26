import React from 'react';
import { Link } from "react-router-dom";
/**
 * <Navbar />
 * 
 */
export const Navbar = () => {
  return (
      <nav>
        <ul className="nav">
          <li className="nav-item"><Link to="/">Posts</Link></li>
        </ul>
      </nav>
  )  
}
