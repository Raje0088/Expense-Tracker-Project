import React from "react";
import styles from "./AddCart.module.css";

const AddCart = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>Cart</h2>
        <button>Cart</button>
      </div>
      <div className={styles.content}>
        <div className={styles.box}>
          <h2>Your Shopping Cart</h2>
          <div className={styles.boxheader} >
            <span>
              <h2>Test Item</h2>
              <h3>$18.00</h3>
            </span>
            <span>
              <h2>x3</h2>
              <div className={styles.boxbutton}>
                <button>-</button>
                <button>+</button>
              </div>
            </span>
          </div>
        </div>
        <h1>BUY YOUR FAVORITE PRODUCTS</h1>
        <div className={styles.box}>
          <div className={styles.boxheader} >
            <span>
              <h2>Test </h2>
              <h3>$6.00</h3>
            </span>
            <span>
              <p>This is a first product - amazing</p>
              <div className={styles.boxbutton}>
                <button>Add To Cart</button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCart;
