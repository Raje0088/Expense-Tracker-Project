import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(async (res) => {
            const data = await res.json();
            console.log("data get", data);
            setName(data.users[0].displayName);
            setUrl(data.users[0].photoUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log("internal error", err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => {
          const data = await res.json();
          console.log("data update", data);
        })
        .catch((err) => {
          console.log("internal error", err);
        });
    } catch (err) {}
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleEmail = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDk8CwJ44jFYWSjjDMJOPkDdHMO4obFdfM",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
          }),
        }
      )
        .then(async (res) => {
          const data = await res.json();
          console.log("verify data", data);
          if (data.email) {
            alert("check your gmail");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } catch (err) {
      console.log("internal error", err);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Winners never quite Quitters never win.</h1>
        <span>
          Your Profile is incomplete.{" "}
          <strong style={{ color: "blue" }}>Complete now</strong>
        </span>
        <div>
          <button
            onClick={handleEmail}
            style={{ margin: "5px" }}
            className={styles.buttons}
          >
            Email
          </button>
          <button onClick={handleLogout} className={styles.buttons}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["content-div"]}>
          <span>
            <h3>Contact Details</h3>
            <button className={styles.buttons}>Cancel</button>
          </span>
          <span>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="">Profile URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </span>
          <span>
            <p></p>
            <button onClick={handleUpdate} className={styles.buttons}>
              Update
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
