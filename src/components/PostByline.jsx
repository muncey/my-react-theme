import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../app/usersSlice';
import TimeAgo from './TimeAgo';

export default function PostByline({ userId, timestamp }) {
  const author = useSelector((state) => selectUserById(state, userId));
  return (
    <div className="author">
      <a href={author.link}>
        <img className="author-image" src={author['avatar_urls']['24']}/>
      </a>
      <div className="author-details">
        <span className="author-name">{author.name}</span>
        <TimeAgo timestamp={timestamp} />
      </div>
    </div>
    
)
}
