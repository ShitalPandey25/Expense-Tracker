import { useState, useEffect } from "react";
import API from "../api/axios";
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

useEffect(() => {
  const fetchIncome = async () => {
    try {
      const response = await API.get("/income");
      setIncomeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchIncome();
}, []);

  const handleChange = (e) => {

    setIncomeForm({

      ...incomeForm,

      [e.target.name]: e.target.value,

    });

  };

  const clearForm = () => {

    setIncomeForm({

      title: "",
      category: "",
      amount: "",
      date: "",

    });

    setEditId(null);

  };


  const handleSave = async () => {

  if (
    !incomeForm.title ||
    !incomeForm.category ||
    !incomeForm.amount ||
    !incomeForm.date
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const response = await API.post("/income", {
      title: incomeForm.title,
      category: incomeForm.category,
      amount: Number(incomeForm.amount),
      date: incomeForm.date,
    });

    setIncomeData([...incomeData, response.data.income]);

    clearForm();
    setShowForm(false);

  } catch (error) {
    console.error(error);
    alert("Failed to save income");
  }

};

  const handleEdit = (income) => {


    setIncomeForm({

      title: income.title,

      category: income.category,

      amount: income.amount.replace("₹","").replace(",",""),

      date: income.date,

    });

    setEditId(income._id);


    setShowForm(true);


  };


  const handleDelete = (id) => {


    const confirmDelete = window.confirm(

      "Are you sure you want to delete this income?"

    );



    if(!confirmDelete){

      return;

    }



    const updatedIncome = incomeData.filter(

      (income)=> income.id !== id

    );

    setIncomeData(updatedIncome);


  };

  return (

    <div className="income">


      <div className="income-header">

        <h1>Income</h1>


        <button

          className="add-btn"

          onClick={()=>{

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

            onClick={()=>{

              setShowForm(false);

              clearForm();

            }}

          ></div>
          <div className="income-form">


            <h3>

              {editId ? "Edit Income" : "Add Income"}

            </h3>

            <input

              type="text"

              name="title"

              placeholder="Title"

              value={incomeForm.title}

              onChange={handleChange}

            />
            <input

              type="text"

              name="category"

              placeholder="Category"

              value={incomeForm.category}

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

                onClick={()=>{

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

            <th>Category</th>

            <th>Date</th>

            <th>Amount</th>

            <th>Action</th>

          </tr>


        </thead>
        <tbody>


          {incomeData.map((income)=>(


            <tr key={income._id}>


              <td>{income.title}</td>

              <td>{income.category}</td>

              <td>{income.date}</td>

              <td className="income-amount">

                {income.amount}

              </td>
              <td className="action-buttons">


                <button

                  className="edit-btn"

                  onClick={()=>handleEdit(income)}

                >

                  ✏️

                </button>
                <button

                  className="delete-btn"

                  onClick={()=>handleDelete(income._id)}

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
export default Income;