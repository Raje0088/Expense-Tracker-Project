import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword)
      return alert("all fields required");
    if (password !== confirmPassword) return alert("Password Must Match");
    try {
      if (isLogin) {
        const result = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              confirmPassword: confirmPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(async (res) => {
            const data = await res.json();
            console.log("login", data);
            if (data.idToken) {
              navigate("/");
            }
            if (data && data.error && data.error.message) {
              alert(data.error.message);
            }
          })
          .catch((err) => {
            console.log("internal error", err);
          });
      } else {
        const result = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              confirmPassword: confirmPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(async (res) => {
            const data = await res.json();
            console.log("data", data);

            if (data && data.error && data.error.message) {
              alert(data.error.message);
            }
            if (data && data.error && data.error.message === "EMAIL_EXISTS") {
              setIsLogin(true);
            }
          })
          .catch((err) => {
            console.log("internal error", err);
          });
      }
    } catch (err) {
      console.log("internal error", err);
      alert(err);
    }
  };
  return (
    <div className={styles.main}>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <span className={styles.spancustom}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        </span>
        <span className={styles.spandiv}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </span>
        <span className={styles.spandiv}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </span>
        <span className={styles.spandiv}>
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="text"
            id="confirm"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </span>
        <span className={styles.spancustom}>
          <button className={styles.custombtn}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </span>
        <span className={styles.last}>
          {isLogin ? (
            <p
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Already Registered?
            </p>
          )}
        </span>
      </form>
    </div>
  );
};

export default Login;
