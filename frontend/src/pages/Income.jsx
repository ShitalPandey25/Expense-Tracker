import "./Income.css";

function Income() {
  const incomeData = [
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
  ];

  return (
    <div className="income">
      <div className="income-header">
        <h1>Income</h1>

        <button className="add-btn">
          + Add Income
        </button>
      </div>

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