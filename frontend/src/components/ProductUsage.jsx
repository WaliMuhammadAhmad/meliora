import React from "react";
import styles from './style.module.css'

export default function ProductUsage() {
  return (
    <div class={styles.productcardscontainer}>
      <h1>How to use All-Purpose Home Cleaner</h1>
      <div className={styles.cards}>
        <div class={styles.card}>
          <img src="/cards.webp" alt="Step 1" />
          <h3>Add a refill tablet to the bottle</h3>
          <p>
            Our bottles come with a tablet inside. To refill the bottle, remove
            the sprayer attachment and add one refill tablet. Each tablet makes
            about 16 fl. oz. of liquid cleaner.
          </p>
        </div>

        <div class={styles.card}>
          <img src="/cards.webp" alt="Step 2" />
          <h3>Add a refill tablet to the bottle</h3>
          <p>
            Our bottles come with a tablet inside. To refill the bottle, remove
            the sprayer attachment and add one refill tablet. Each tablet makes
            about 16 fl. oz. of liquid cleaner.
          </p>
        </div>

        <div class={styles.card}>
          <img src="/cards.webp" alt="Step 3" />
          <h3>Add a refill tablet to the bottle</h3>
          <p>
            Our bottles come with a tablet inside. To refill the bottle, remove
            the sprayer attachment and add one refill tablet. Each tablet makes
            about 16 fl. oz. of liquid cleaner.
          </p>
        </div>
      </div>
    </div>
  );
}
