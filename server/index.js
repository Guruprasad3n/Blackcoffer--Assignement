import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import router from "./Routes/dashboardRoute.js";
const app = express();

dotenv.config();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get("/", async (req, res) => {
//   res.send("Hello BlackCoffer");
// });
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async (req, res) => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
