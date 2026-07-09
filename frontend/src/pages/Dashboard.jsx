import "./Dashboard.css";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome Back 👋</h1>

      <div className="summary-container">
        <SummaryCard
          title="Total Balance"
          amount="25,000"
        />

        <SummaryCard
          title="Total Income"
          amount="40,000"
        />

        <SummaryCard
          title="Total Expense"
          amount="15,000"
        />
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
            <tr>
              <td>Salary</td>
              <td>Income</td>
              <td>₹30,000</td>
            </tr>

            <tr>
              <td>Groceries</td>
              <td>Food</td>
              <td>₹1,200</td>
            </tr>

            <tr>
              <td>Electricity Bill</td>
              <td>Bills</td>
              <td>₹900</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;