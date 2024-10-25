import React from "react";

export default function ReviewSection() {
  return (
    <div class="review-section">
      <h2>Customer Reviews</h2>
      <div class="header">
        <div class="rating-summary">
          <span class="stars">★★★★☆</span>
          <span>4.5 out of 5</span>
          <p>Based on 109 Reviews</p>
        </div>
        <div class="rating-breakdown">
          <div class="rating-bar">
            <span class="stars">★★★★★</span>
            <div class="bar">
              <div class="fill" style={{ width: "90%" }}></div>
            </div>
            <span>98</span>
          </div>
          <div class="rating-bar">
            <span class="stars">★★★★</span>
            <div class="bar">
              <div class="fill" style={{ width: " 8%" }}></div>
            </div>
            <span>5</span>
          </div>
          <div class="rating-bar">
            <span class="stars">★★★</span>
            <div class="bar">
              <div class="fill" style={{ width: "4%" }}></div>
            </div>
            <span>4</span>
          </div>
          <div class="rating-bar">
            <span class="stars">★★</span>
            <div class="bar">
              <div class="fill" style={{ width: "1%;" }}></div>
            </div>
            <span>1</span>
          </div>
          <div class="rating-bar">
            <span class="stars">★</span>
            <div class="bar">
              <div class="fill" style={{ width: "1%;" }}></div>
            </div>
            <span>1</span>
          </div>
        </div>
        <button class="write-review">Write a Review</button>
      </div>

      <div class="search-review">
        <input type="text" placeholder="Search Review" />
        <button class="search-btn">🔍</button>
      </div>

      <div class="review">
        <div class="review-header">
          <div className="top-heading">
            <h4>Melanie Morningstar</h4>
            <span class="verified">Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div class="review-content">
          <h5>Best spray cleaner I've ever used</h5>
          <p>
            This spray cleaner is wonderful. It cuts grease and grime and makes
            cleaning so easy...
          </p>
        </div>
        <div class="review-header">
          <div className="top-heading">
            <h4>Melanie Morningstar</h4>
            <span class="verified">Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div class="review-content">
          <h5>Best spray cleaner I've ever used</h5>
          <p>
            This spray cleaner is wonderful. It cuts grease and grime and makes
            cleaning so easy...
          </p>
        </div>
        <div class="review-header">
          <div className="top-heading">
            <h4>Melanie Morningstar</h4>
            <span class="verified">Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div class="review-content">
          <h5>Best spray cleaner I've ever used</h5>
          <p>
            This spray cleaner is wonderful. It cuts grease and grime and makes
            cleaning so easy...
          </p>
        </div>
      </div>
    </div>
  );
}
