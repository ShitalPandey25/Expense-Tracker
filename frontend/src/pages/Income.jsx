import { useState } from "react";
import "./income.css";

function Income() {

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);


  const [incomeForm, setIncomeForm] = useState({
    title: "",
    source: "",
    amount: "",
    date: "",
  });



  const [incomeData, setIncomeData] = useState(() => {

    const savedIncome = localStorage.getItem("incomeData");

    return savedIncome
      ? JSON.parse(savedIncome)
      : [
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

  });



  const handleChange = (e) => {

    setIncomeForm({

      ...incomeForm,

      [e.target.name]: e.target.value,

    });

  };



  const clearForm = () => {

    setIncomeForm({

      title: "",
      source: "",
      amount: "",
      date: "",

    });

    setEditId(null);

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



    let updatedIncome;



    // UPDATE INCOME

    if(editId){


      updatedIncome = incomeData.map((income)=>{


        if(income.id === editId){

          return {

            ...income,

            title: incomeForm.title,

            source: incomeForm.source,

            amount: `₹${incomeForm.amount}`,

            date: incomeForm.date,

          };

        }


        return income;


      });


    }



    // ADD NEW INCOME

    else{


      const newIncome = {

        id: Date.now(),

        title: incomeForm.title,

        source: incomeForm.source,

        amount: `₹${incomeForm.amount}`,

        date: incomeForm.date,

      };


      updatedIncome = [

        ...incomeData,

        newIncome

      ];


    }



    setIncomeData(updatedIncome);



    localStorage.setItem(

      "incomeData",

      JSON.stringify(updatedIncome)

    );

    clearForm();

    setShowForm(false);


  };


  const handleEdit = (income) => {


    setIncomeForm({

      title: income.title,

      source: income.source,

      amount: income.amount.replace("₹","").replace(",",""),

      date: income.date,

    });

    setEditId(income.id);


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

    localStorage.setItem(

      "incomeData",

      JSON.stringify(updatedIncome)

    );


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

            <th>Source</th>

            <th>Date</th>

            <th>Amount</th>

            <th>Action</th>

          </tr>


        </thead>
        <tbody>


          {incomeData.map((income)=>(


            <tr key={income.id}>


              <td>{income.title}</td>

              <td>{income.source}</td>

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

                  onClick={()=>handleDelete(income.id)}

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