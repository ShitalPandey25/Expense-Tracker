import { useState, useEffect } from "react";
import API from "../api/axios";
import "./Dashboard.css";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

      useEffect(() => {

    const fetchData = async () => {

      try {

        const incomeResponse = await API.get("/income");
        const expenseResponse = await API.get("/expenses");

        setIncomeData(incomeResponse.data);
        setExpenseData(expenseResponse.data);

      } catch (error) {

        console.log(error);

      }

    };


    fetchData();

  }, []);

    const totalIncome = incomeData.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  const totalExpense = expenseData.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalBalance = totalIncome - totalExpense;


  return (
    <div className="dashboard">
      <h1>Track Your Finances 💰</h1>

      <div className="summary-container">
       <div className="summary-container">

  <SummaryCard
    title="Total Balance"
    amount={`${totalBalance}`}
  />

  <SummaryCard
    title="Total Income"
    amount={`${totalIncome}`}
  />

  <SummaryCard
    title="Total Expense"
    amount={`${totalExpense}`}
  />

</div>
      </div>

      <div className="transactions">
        <h2>Recent Transactions</h2>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

  {[
    ...incomeData.map((income) => ({
      ...income,
      type: "Income",
    })),

    ...expenseData.map((expense) => ({
      ...expense,
      type: "Expense",
    })),
  ]
    .slice(0, 5)
    .map((transaction) => (

      <tr key={transaction._id}>

        <td>{transaction.title}</td>

        <td>
          {transaction.type}
        </td>

        <td>
          ₹{transaction.amount}
        </td>

      </tr>

    ))}

</tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;