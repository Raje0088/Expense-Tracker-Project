import React, { useEffect } from "react";
import styles from "./AddCart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, cartsActions } from "../store/Redux";

const AddCart = () => {
  const cartItemArray = [
    {
      id: 1,
      title: "Shoe",
      price: 18.0,
      description: "This is amazing shoe",
    },
    {
      id: 2,
      title: "Bag",
      price: 10.0,
      description: "This is Bag for regular purpose",
    },
    {
      id: 3,
      title: "Pen",
      price: 5.0,
      description: "Pen can brings peace in world",
    },
  ];

  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.cart.toggle);
  const cartQuantity = useSelector((state) => state.carts.totalQuantity);
  const cartItems = useSelector((state) => state.carts.items);
  console.log(toggle);

  useEffect(() => {
    const URL =
      "https://expense-tracker-product-default-rtdb.firebaseio.com/product.json";
    const fetchData = async () => {
      const result = await fetch(URL, {
        method: "GET",
      });
      const data = await result.json();
      
    if (!data) return;

    // Update Redux store with fetched data
    dispatch(
      cartsActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.totalQty || 0,
      })
    );
      console.log("products", data,cartItems);
    };
    fetchData();
  }, [dispatch]);
  
  useEffect(() => {
    if (cartItems.length === 0) return;
    const URL =
      "https://expense-tracker-product-default-rtdb.firebaseio.com/product.json";
    const fetchData = async () => {
      const result = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify({
          items: cartItems,
          totalQty: cartQuantity,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      console.log("products", data);
    };
    fetchData();
  }, [cartItems, cartQuantity]);

  const handleToggle = () => {
    dispatch(cartActions.toggleCart());
  };

  const addToCartHandler = (item) => {
    dispatch(
      cartsActions.addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
      })
    );
  };

  const handleAddItem = (item) => {
    dispatch(
      cartsActions.addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
      })
    );
  };
  const handleRemoveItem = (item) => {
    dispatch(cartsActions.removeItemFromCart(item.id));
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>Cart</h2>
        <button onClick={handleToggle}>MyCart {cartQuantity}</button>
      </div>
      <div className={styles.content}>
        {toggle && (
          <div className={styles.box}>
            <h2>Your Shopping Cart</h2>
            {cartItems.map((item) => (
              <div className={styles.boxheader}>
                <span>
                  <h2>{item.name}</h2>
                  <h3>
                    ${item.totalPrice} (${item.price}/item)
                  </h3>
                </span>
                <span>
                  <h4>x{item.quantity}</h4>
                  <div className={styles.boxbutton}>
                    <button
                      onClick={() => {
                        handleRemoveItem(item);
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        handleAddItem(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                </span>
              </div>
            ))}
          </div>
        )}
        <h1>BUY YOUR FAVORITE PRODUCTS</h1>
        {cartItemArray.map((item) => (
          <div className={styles.box} key={item.id}>
            <div className={styles.boxheader}>
              <span>
                <h2>{item.title} </h2>
                <h3>${item.price}</h3>
              </span>
              <span>
                <p>{item.description}</p>
                <div className={styles.boxbutton}>
                  <button
                    onClick={() => {
                      addToCartHandler(item);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCart;
