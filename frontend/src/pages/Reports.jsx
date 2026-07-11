import "./Reports.css";

function Reports() {
  return (
    <div className="reports">
      <h1>Reports</h1>

      <div className="report-cards">
        <div className="report-card">
          <h3>Total Income</h3>
          <p>₹40,000</p>
        </div>

        <div className="report-card">
          <h3>Total Expense</h3>
          <p>₹15,000</p>
        </div>

        <div className="report-card">
          <h3>Total Balance</h3>
          <p>₹25,000</p>
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
              <td>July</td>
              <td>₹40,000</td>
              <td>₹15,000</td>
              <td>₹25,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;