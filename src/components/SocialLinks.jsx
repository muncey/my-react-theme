import React from "react";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <div className="social-links-header">
        <h4>Follow me</h4>
      </div>
      <div className="social-links-list" role="list">
        <div className="social-link twitter" role="listitem">
          <a target="_blank" href="https://twitter.com/MuncePhilip?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-show-count="false">
          <i className="bi bi-twitter"></i> Twitter
          </a>
        </div>
        <div className="social-link github" role="listitem">
          <a target="_blank" href="https://github.com/muncey">
            <i className="bi bi-github"></i> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
