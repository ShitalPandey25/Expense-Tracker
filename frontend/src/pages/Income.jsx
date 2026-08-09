import { useState, useEffect } from "react";
import "./income.css";

function Income() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [incomeForm, setIncomeForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  const [incomeData, setIncomeData] = useState([]);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    fetchIncome();
  }, []);

  // Get All Income
  const fetchIncome = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/income`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const data = await response.json();

      setIncomeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Input Change
  const handleChange = (e) => {
    setIncomeForm({
      ...incomeForm,
      [e.target.name]: e.target.value,
    });
  };

  // Clear Form
  const clearForm = () => {
    setIncomeForm({
      title: "",
      Source: "",
      amount: "",
      date: "",
    });

    setEditId(null);
  };

  // Save / Update
  const handleSave = async () => {
    if (
      !incomeForm.title ||
      !incomeForm.Source ||
      !incomeForm.amount ||
      !incomeForm.date
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      // UPDATE
      if (editId) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/income/${editId}`,
          {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              title: incomeForm.title,
              Source: incomeForm.Source,
              amount: Number(incomeForm.amount),
              date: incomeForm.date,
            }),
          }
        );

        const data = await response.json();
        alert(data.message);
      }

      // ADD
      else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/income`,
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              title: incomeForm.title,
              Source: incomeForm.Source,
              amount: Number(incomeForm.amount),
              date: incomeForm.date,
            }),
          }
        );

        const data = await response.json();
        alert(data.message);
      }

      fetchIncome();
      clearForm();
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  // Edit
  const handleEdit = (income) => {
    setIncomeForm({
      title: income.title,
      Source: income.Source,
      amount: income.amount,
      date: income.date.split("T")[0],
    });

    setEditId(income._id);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/income/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchIncome();
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };
    return (
    <div className="income">

      <div className="income-header">
        <h1>Income</h1>

        <button
          className="add-btn"
          onClick={() => {
            clearForm();
            setShowForm(true);
          }}
        >
          + Add Income
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

          <div className="income-form">

            <h3>{editId ? "Edit Income" : "Add Income"}</h3>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={incomeForm.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="Source"
              placeholder="Source"
              value={incomeForm.Source}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={incomeForm.amount}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={incomeForm.date}
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

      <table className="income-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Source</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {incomeData.length > 0 ? (

            incomeData.map((income) => (

              <tr key={income._id}>

                <td>{income.title}</td>

                <td>{income.Source}</td>

                <td>
                  {new Date(income.date)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </td>

                <td className="income-amount">
                  ₹{income.amount}
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(income)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(income._id)}
                  >
                    🗑️
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Income Found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Income;
