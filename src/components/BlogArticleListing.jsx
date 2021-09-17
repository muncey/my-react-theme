import React, { useState, useEffect } from 'react';
import BlogArticle from './BlogArticle';
import _ from "lodash";

/**
 * <BlogArticleListing />
 */
export default function BlogArticleListing(props) {

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.fetch(
      `https://www.munceyweb.com/wp-json/wp/v2/posts?page=${page}`
    ).then(res => {
      setTotal(parseInt(res.headers.get('X-WP-Total')));
      setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));      
      return res.json()
    })
    .then(items => {

      const mappedPosts = _.map(items, item => {
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          content: item.content.rendered,
          excerpt: item.content.rendered,
          author: item.author,
          tags: 'test',
          commentsCount: '0 comments',
          format: 'html',
          expanded: false
        }      
      });
      setPosts(mappedPosts);

      setIsLoading(false);

    });
  }, [page]);

  const postsList = _.map(posts, (p, index) => {
    return (
      <div key={index}>
        <BlogArticle
          title={p.title}
          content={p.excerpt}
          author={p.author}
          date={p.date}
          tags={p.tags}
          commentsCount={p.commentsCount}
          format={p.format} />          
      </div>
    )
  });
console.log(page, totalPages);
  const pagination = (
    <div className="blog-pagination mb-3 mt-3 d-flex flex-row justify-content-between">
      <button disabled={page === 1} className="btn btn-secondary" onClick={() => setPage(page - 1)}>Prev</button>
      <div className="pl-5">Page {page} of {totalPages}</div>
      <button disabled={page === totalPages} className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );

  return (
    <div className="blog-article-list">
      {isLoading && <p>Wait I'm Loading posts for you</p>}
      {pagination}
      {postsList}
      {pagination}
    </div>
  );
}