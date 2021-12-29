import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserById } from '../app/usersSlice';

export default function PostAuthor({ userId }) {
  const author = useSelector((state) => selectUserById(state, userId));
  return (
    <div className="author">
      <a href={author.link}>
        <img className="author-image" src={author['avatar_urls']['48']}/>
      </a>
      <div className="author-details">{author.name}</div>
    </div>
    
)
}
