import { useState } from "react";
import "./Income.css";

function Income() {
  const [showForm, setShowForm] = useState(false);

  const [incomeForm, setIncomeForm] = useState({
    title: "",
    source: "",
    amount: "",
    date: "",
  });

  const [incomeData, setIncomeData] = useState([
    {
      id: 1,
      title: "Salary",
      source: "Job",
      amount: "₹30,000",
      date: "01 Jul 2026",
    },
    {
      id: 2,
      title: "Freelancing",
      source: "Client",
      amount: "₹8,000",
      date: "05 Jul 2026",
    },
    {
      id: 3,
      title: "Bonus",
      source: "Company",
      amount: "₹2,000",
      date: "08 Jul 2026",
    },
  ]);

  const handleChange = (e) => {
    setIncomeForm({
      ...incomeForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !incomeForm.title ||
      !incomeForm.source ||
      !incomeForm.amount ||
      !incomeForm.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newIncome = {
      id: incomeData.length + 1,
      title: incomeForm.title,
      source: incomeForm.source,
      amount: `₹${incomeForm.amount}`,
      date: incomeForm.date,
    };

    setIncomeData([...incomeData, newIncome]);

    setIncomeForm({
      title: "",
      source: "",
      amount: "",
      date: "",
    });

    setShowForm(false);
  };

  return (
    <div className="income">
      <div className="income-header">
        <h1>Income</h1>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Income
        </button>
      </div>

      {showForm && (
        <div className="income-form">
          <h3>Add Income</h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={incomeForm.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="source"
            placeholder="Source"
            value={incomeForm.source}
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
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="income-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Source</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {incomeData.map((income) => (
            <tr key={income.id}>
              <td>{income.title}</td>
              <td>{income.source}</td>
              <td>{income.date}</td>
              <td className="income-amount">{income.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Income;