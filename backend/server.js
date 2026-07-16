import express from "express";
import dotenv from "dotenv";
import cors from "cors";
<<<<<<< HEAD

=======
>>>>>>> d332f3876260dcf16ee5fddbfb1e28dbe1c4d94c
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";

dotenv.config();

connectDB();

const app = express();
<<<<<<< HEAD


=======
>>>>>>> d332f3876260dcf16ee5fddbfb1e28dbe1c4d94c
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);


app.get("/", (req, res) => {
  res.send("Expense Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});