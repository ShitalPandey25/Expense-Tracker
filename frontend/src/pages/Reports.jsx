import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [report, setReport] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
});

useEffect(() => {
  fetchReport();
}, []);

const fetchReport = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/reports");

    const data = await response.json();

    setReport(data);

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="reports">
      <h1>Reports</h1>

      <div className="report-cards">
        <div className="report-card">
          <h3>Total Income</h3>
          <p>₹{report.totalIncome}</p>
        </div>

        <div className="report-card">
          <h3>Total Expense</h3>
          <p>₹{report.totalExpense}</p>
        </div>

        <div className="report-card">
          <h3>Total Balance</h3>
          <p>₹{report.balance}</p>
        </div>
      </div>

      <div className="report-summary">
        <h2>Monthly Summary</h2>

        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            <tr>
  <td>{new Date().toLocaleString("default", { month: "long" })}</td>
  <td>₹{report.totalIncome}</td>
  <td>₹{report.totalExpense}</td>
  <td>₹{report.balance}</td>
</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;