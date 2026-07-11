import "./Expenses.css";

function Expenses() {
  const expenses = [
    {
      id: 1,
      title: "Groceries",
      category: "Food",
      amount: "₹1,200",
      date: "09 Jul 2026",
    },
    {
      id: 2,
      title: "Electricity Bill",
      category: "Bills",
      amount: "₹900",
      date: "08 Jul 2026",
    },
    {
      id: 3,
      title: "Shopping",
      category: "Shopping",
      amount: "₹2,500",
      date: "07 Jul 2026",
    },
  ];

  return (
    <div className="expenses">
      <div className="expense-header">
        <h1>Expenses</h1>

        <button className="add-btn">
          + Add Expense
        </button>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;