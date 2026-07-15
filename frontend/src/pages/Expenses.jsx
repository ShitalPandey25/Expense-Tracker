import { useState, useEffect } from "react";
import API from "../api/axios";
import "./Expenses.css";

function Expenses() {
useEffect(() => {

    API.get("/expenses")
    .then((response)=>{

        console.log(response.data);

    })
    .catch((error)=>{

        console.log(error);

    });

},[]); 

  const [expenses, setExpenses] = useState(() => {

    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [
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

  });



  const handleChange = (e) => {

    setExpenseForm({
      ...expenseForm,
      [e.target.name]: e.target.value,
    });

  };



  const clearForm = () => {

    setExpenseForm({
      title: "",
      category: "",
      amount: "",
      date: "",
    });

    setEditId(null);

  };



  const handleSave = () => {


    if (
      !expenseForm.title ||
      !expenseForm.category ||
      !expenseForm.amount ||
      !expenseForm.date
    ) {

      alert("Please fill all fields.");
      return;

    }


    let updatedExpenses;

    // UPDATE EXPENSE
    if(editId){


      updatedExpenses = expenses.map((expense)=>{


        if(expense.id === editId){

          return {

            ...expense,

            title: expenseForm.title,

            category: expenseForm.category,

            amount: `₹${expenseForm.amount}`,

            date: expenseForm.date,

          };

        }


        return expense;


      });


    }


    // ADD NEW EXPENSE
    else{


      const newExpense = {

        id: Date.now(),

        title: expenseForm.title,

        category: expenseForm.category,

        amount: `₹${expenseForm.amount}`,

        date: expenseForm.date,

      };


      updatedExpenses = [

        ...expenses,

        newExpense

      ];


    }



    setExpenses(updatedExpenses);

    localStorage.setItem(

      "expenses",

      JSON.stringify(updatedExpenses)

    );



    clearForm();

    setShowForm(false);


  };



  const handleEdit = (expense) => {


    setExpenseForm({

      title: expense.title,

      category: expense.category,

      amount: expense.amount.replace("₹","").replace(",",""),

      date: expense.date,

    });



    setEditId(expense.id);



    setShowForm(true);


  };





  const handleDelete = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );


  if (!confirmDelete) {
    return;
  }



  const updatedExpenses = expenses.filter(

    (expense) => expense.id !== id

  );

  setExpenses(updatedExpenses);

  localStorage.setItem(

    "expenses",

    JSON.stringify(updatedExpenses)

  );

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

              <option value="" disabled>

                Select Category

              </option>


              <option value="Food">
                Food
              </option>


              <option value="Bills">
                Bills
              </option>


              <option value="Shopping">
                Shopping
              </option>


              <option value="Travel">
                Travel
              </option>


              <option value="Health">
                Health
              </option>


              <option value="Entertainment">
                Entertainment
              </option>


              <option value="Education">
                Education
              </option>


              <option value="Other">
                Other
              </option>


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

          {expenses.map((expense)=>(

            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td className="expense-amount">

                {expense.amount}

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

                  onClick={() => handleDelete(expense.id)}

                >

                  🗑️

                </button>


              </td>


            </tr>


          ))}


        </tbody>


      </table>


    </div>

  );

}


export default Expenses;