import { BrowserRouter } from "react-router-dom";
import ExpenseRouter from "./Router/ExpenseRouter";

function App() {
  return (
    <BrowserRouter>
      <ExpenseRouter />
    </BrowserRouter>
  );
}

export default App;