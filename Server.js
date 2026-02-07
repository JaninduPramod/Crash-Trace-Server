import dotenv from "dotenv";
dotenv.config();
import app from "./src/App.js";
import { connectDB } from "./src/config/Db.js";

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
