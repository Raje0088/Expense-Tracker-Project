import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { counterActions, authActions,themeActions } from "../store/Redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Authentication.isAuthenticate);
  const counter = useSelector((state) => state.counter.counter);
  const theme = useSelector((state)=> state.Theme.darkTheme)
  const totalExpenses = useSelector((state)=>state.Theme.totalExpense)
  console.log("counter", counter);
  console.log("auth", auth);
  console.log("theme", theme);
  console.log("totalExpenses", totalExpenses);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(authActions.onLogout());
    navigate("/login");
  };


  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const incrementByValueHandler = () => {
    dispatch(counterActions.increase(5));
  };
  const decreaseHandler = () => {
    dispatch(counterActions.decrement());
  };

  const handleToProfile = () => {
    navigate("/profile");
  };
  const handleToPremium = () => {
    navigate("/expense");
  };

  const toggleTheme = ()=>{
    dispatch(themeActions.toggleDarkTheme())
  }
  return (
    <div className={theme ? styles.darkmode : styles.main}>
      <div className={styles.header}>
        <h1>Winners never quite Quitters never win.</h1>
        <span onClick={handleToProfile}>
          Your Profile is incomplete.{" "}
          <strong style={{ color: "blue" }}>Complete now</strong>
        </span>
        <div className={styles.navbar}>
          {auth && <button onClick={handleToPremium} className={styles["shine-button"]}>Premium {totalExpenses}</button>}
          {auth && <button onClick={()=>{navigate("/cart")}} className={styles["shine-button"]}>Product</button>}
          {!auth && <button onClick={logoutHandler}>Login</button>}
          {auth && <button onClick={logoutHandler}>Logout</button>}
          {totalExpenses >=10000 && <button onClick={toggleTheme}>{theme ? "Light" : "Dark"}</button>}
        </div>
      </div>
      {auth === true ? (
        <div className={styles.form}>
          <span>
            <h1 htmlFor="">Welcome</h1>
          </span>
        </div>
      ) : (
        <div className={styles.form}>
          <span>
            <h1 htmlFor="">Please Login</h1>
          </span>
        </div>
      )}

      <div className={styles.btndiv}>
        <div className={styles.btnheaader}>
          <h1>{counter}</h1>
        </div>
        <div className={styles.btn}>
          <button onClick={incrementHandler}>Add</button>
          <button onClick={incrementByValueHandler}>Add By 5</button>
          <button onClick={decreaseHandler}>Subtract</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
