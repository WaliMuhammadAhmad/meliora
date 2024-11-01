import React from "react";
import styles from './style.module.css'

export default function ReviewSection() {
  return (
    <div className={styles.reviewsection}>
      <h2>Customer Reviews</h2>
      <div className={styles.header}>
        <div className={styles.ratingsummary}>
          <span className={styles.stars}>★★★★☆</span>
          <span>4.5 out of 5</span>
          <p>Based on 109 Reviews</p>
        </div>
        <div className={styles.ratingbreakdown}>
          <div className={styles.ratingbar}>
            <span className={styles.stars}>★★★★★</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: "90%" }}></div>
            </div>
            <span>98</span>
          </div>
          <div className={styles.ratingbar}>
            <span className={styles.stars}>★★★★</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: " 8%" }}></div>
            </div>
            <span>5</span>
          </div>
          <div className={styles.ratingbar}>
            <span className={styles.stars}>★★★</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: "4%" }}></div>
            </div>
            <span>4</span>
          </div>
          <div className={styles.ratingbar}>
            <span className={styles.stars}>★★</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: "1%;" }}></div>
            </div>
            <span>1</span>
          </div>
          <div className={styles.ratingbar}>
            <span className={styles.stars}>★</span>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: "1%;" }}></div>
            </div>
            <span>1</span>
          </div>
        </div>
        <button className={styles.writereview}>Write a Review</button>
      </div>

      <div className={styles.searchreview}>
        <input type={styles.text} placeholder="Search  Reviews Here" />
        <button className={styles.searchbtn}>🔍</button>
      </div>

      <div className={styles.review}>
        <div className={styles.reviewheader}>
          <div className={styles.topheading}>
            <h4>Melanie Morningstar</h4>
            <span className={styles.verified}>Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div className={styles.reviewcontent}>
          <h5>Best spray cleaner I've ever used</h5>
          <p>
            This spray cleaner is wonderful. It cuts grease and grime and makes
            cleaning so easy...
          </p>
        </div>
        <div className={styles.reviewheader}>
          <div className={styles.topheading}>
            <h4>Melanie Morningstar</h4>
            <span className={styles.verified}>Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div className={styles.reviewcontent}>
          <h5>Best spray cleaner I've ever used</h5>
          <p>
            This spray cleaner is wonderful. It cuts grease and grime and makes
            cleaning so easy...
          </p>
        </div>
        <div className={styles.reviewheader}>
          <div className={styles.topheading}>
            <h4>Melanie Morningstar</h4>
            <span className={styles.verified}>Verified</span>
          </div>
          <p>McLean, US</p>
        </div>
        <div className={styles.reviewcontent}>
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
