import React from 'react';
import { Link } from "react-router-dom";
/**
 * <Navbar />
 * 
 */
export default function Navbar() {
  return (
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item"><Link to="/"><i className="bi bi-house-door-fill home-icon"></i> Home</Link></li>
          <li className="nav-item authors"><Link to="/users"><i className="bi bi-people authors-icon"></i> Authors</Link></li>
        </ul>
      </nav>
  )  
}
