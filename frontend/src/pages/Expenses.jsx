import { useState, useEffect } from "react";
import "./Expenses.css";

function Expenses() {
  // Form Show/Hide
  const [showForm, setShowForm] = useState(false);

  // Edit Id
  const [editId, setEditId] = useState(null);

  // Expense Form
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  // Expense Data
  const [expenses, setExpenses] = useState([]);

  // Load Expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Get All Expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expenses`
      );

      const data = await response.json();

      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Input Change
  const handleChange = (e) => {
    setExpenseForm({
      ...expenseForm,
      [e.target.name]: e.target.value,
    });
  };

  // Clear Form
  const clearForm = () => {
    setExpenseForm({
      title: "",
      category: "",
      amount: "",
      date: "",
    });

    setEditId(null);
  };

  // Save / Update Expense
  const handleSave = async () => {
    if (
      !expenseForm.title ||
      !expenseForm.category ||
      !expenseForm.amount ||
      !expenseForm.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // UPDATE
      if (editId) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/expenses/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: expenseForm.title,
              category: expenseForm.category,
              amount: Number(expenseForm.amount),
              date: expenseForm.date,
            }),
          }
        );

        const data = await response.json();
        alert(data.message);
      }

      // ADD
      else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/expenses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: expenseForm.title,
              category: expenseForm.category,
              amount: Number(expenseForm.amount),
              date: expenseForm.date,
            }),
          }
        );

        const data = await response.json();
        alert(data.message);
      }

      fetchExpenses();
      clearForm();
      setShowForm(false);

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };
    // Edit Expense
  const handleEdit = (expense) => {
    setExpenseForm({
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date.split("T")[0],
    });

    setEditId(expense._id);
    setShowForm(true);
  };

  // Delete Expense
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="expenses">

      <div className="expense-header">
        <h1>Expenses</h1>

        <button
          className="add-btn"
          onClick={() => {
            clearForm();
            setShowForm(true);
          }}
        >
          + Add Expense
        </button>
      </div>

      {showForm && (
        <>
          <div
            className="form-overlay"
            onClick={() => {
              setShowForm(false);
              clearForm();
            }}
          ></div>

          <div className="expense-form">

            <h3>
              {editId ? "Edit Expense" : "Add Expense"}
            </h3>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={expenseForm.title}
              onChange={handleChange}
            />

            <select
              name="category"
              value={expenseForm.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expenseForm.amount}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={expenseForm.date}
              onChange={handleChange}
            />

            <div className="form-buttons">

              <button onClick={handleSave}>
                {editId ? "Update" : "Save"}
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  clearForm();
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        </>
      )}
            <table className="expense-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {expenses.length > 0 ? (

            expenses.map((expense) => (

              <tr key={expense._id}>

                <td>{expense.title}</td>

                <td>{expense.category}</td>

                <td>
                  {new Date(expense.date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </td>

                <td className="expense-amount">
                  ₹{expense.amount}
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(expense)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(expense._id)}
                  >
                    🗑️
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Expenses Found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Expenses;