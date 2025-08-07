import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/Redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const auth = useSelector((state) => state.Authentication.isAuthenticate);

  useEffect(() => {
    setTimeout(() => {
      setIsSend(false);
    }, 5000);
  }, [isSend]);

  const handleLogIn = () => {
    dispatch(authActions.onLogin());
  };

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
              localStorage.setItem("token", data.idToken);
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

  const handleForget = async () => {
    try {
      const result = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => {
          const data = await res.json();
          console.log("reset password", data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("internal error", err);
    }
  };
  return (
    <div className={styles.main}>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
          handleLogIn();
        }}
        className={styles.form}
      >
        {isForgetPassword ? (
          <span className={styles.spancustom}>
            <h2>Enter Email</h2>
          </span>
        ) : (
          <span className={styles.spancustom}>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          </span>
        )}
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
        {!isForgetPassword && (
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
        )}
        {!isForgetPassword && (
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
        )}
        {isSend && (
          <span className={styles.spandiv}>
            <h2>Code Send. Check your email</h2>
          </span>
        )}
        {!isForgetPassword ? (
          <span className={styles.spancustom}>
            <button className={styles.custombtn}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </span>
        ) : (
          <span className={styles.spancustom}>
            <button
              // disabled={isSend}
              onClick={() => {
                setIsSend(true);
                handleForget();
                console.log(isSend);
              }}
              className={styles.custombtn}
            >
              Send
            </button>
          </span>
        )}
        {isLogin && !isForgetPassword && (
          <span className={styles.last}>
            <p
              onClick={() => {
                setIsForgetPassword(true);
              }}
            >
              Forget Password
            </p>
          </span>
        )}
        <span className={styles.last}>
          {isLogin ? (
            <p
              onClick={() => {
                setIsLogin(false);
                setIsForgetPassword(false);
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
