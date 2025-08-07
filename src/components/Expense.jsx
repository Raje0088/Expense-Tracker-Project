import React, { useState, useEffect } from "react";
import styles from "./Expense.module.css";
import { themeActions } from "../store/Redux";
import { useDispatch } from "react-redux";

const Expense = () => {
  const [expenseItemList, setExpenseItemList] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch()

  useEffect(()=>{
    const price = expenseItemList.reduce((acc,item)=>(
      acc = acc + Number(item.price)
    ),0)
    console.log("pice",price)
    dispatch(themeActions.addTotal(Number(price)))
  },[expenseItemList])

  useEffect(() => {
    const fetchData = async () => {
      let formatedData = [];
      try {
        const URL =
          "https://expense-tracker-60fa3-default-rtdb.firebaseio.com/expenseData.json";

        const result = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        for (const id in data) {
          const doc = data[id];
          formatedData.push({
            id: id,
            price: doc.price,
            description: doc.description,
            category: doc.category,
          });
        }
        // console.log("get", formatedData);
        setExpenseItemList(formatedData);
      } catch (err) {
        console.log("internal error", err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleExpenses = async () => {
    try {
      if (editIndex) {
        const URL = `https://expense-tracker-60fa3-default-rtdb.firebaseio.com/expenseData/${editIndex}.json`;
        const result = await fetch(URL, {
          method: "PUT",
          body: JSON.stringify({
            price: price,
            description: description,
            category: category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        console.log("update", data);
        setEditIndex(null);
      } else {
        const URL =
          "https://expense-tracker-60fa3-default-rtdb.firebaseio.com/expenseData.json";
        const result = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({
            price: price,
            description: description,
            category: category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        console.log("save", data);
      }
      setPrice("");
      setCategory("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log("internal error", err);
    }
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };
  const handleDelete = async (index) => {
    try {
      const URL = `https://expense-tracker-60fa3-default-rtdb.firebaseio.com/expenseData/${index}.json`;
      const result = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Delete  Successfully");
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log("internal error", err);
    }
  };
  const downloadHandler = () => {
    try {
      const data = expenseItemList;
      const header = (["SrNo","Price","Description","Category"])
      const row = data.map(
        (item,idx) => `${idx+1}$,{item.price},${item.description},${item.category}`
      )
      const totalExpense = data.reduce((acc,item)=>(
        acc + parseInt(item.price)
      ), 0)

      console.log("totalE",totalExpense)
      const  item  = [header.join(","),...row,totalExpense].join("\n")
      const result = new Blob([item], {
        type: "csv",
      });

      const url = URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = "demo.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log("internal error", err);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <span>
          <label htmlFor="">Money Spend</label>
          <input
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </span>
        <span>
          <label htmlFor="">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </span>

        <span>
          <label htmlFor="">Category</label>
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">select</option>
            <option value="PETROL">PETROL</option>
            <option value="RECHARGE">RECHARGE</option>
            <option value="SALARY">Salary</option>
            <option value="FOOD">Food</option>
            <option value="TRAVEL">Travel</option>
          </select>
        </span>
        <span>
          <button
            className={styles.buttons}
            onClick={() => {
              handleExpenses();
            }}
          >
            {editIndex ? "Update" : "Add Expense"}
          </button>
        </span>
      </div>
      <div className={styles.tablediv}>
        <div className={styles.header}>
          <h2>Expense Tracker</h2>
          <button
            className={styles.buttons}
            onClick={() => {
              downloadHandler();
            }}
          >
            Download Excel
          </button>
          {/* <button className={styles.buttons}>Download</button> */}
        </div>
        <div className={styles.table}>
          <p>SrNo</p>
          <p>Expense</p>
          <p>Description</p>
          <p>Category</p>
          <p>Edit</p>
          <p>Delete</p>
        </div>
        {(expenseItemList || []).map((item, idx) => (
          <div className={styles.table} key={idx}>
            <p>{idx + 1}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <button
              style={{ maxWidth: "50px" }}
              className={styles.buttons}
              onClick={() => {
                handleEdit(item);
              }}
            >
              Edit
            </button>
            <button
              style={{ maxWidth: "50px" }}
              className={styles.buttons}
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
