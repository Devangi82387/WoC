const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use("/customers", require("./routes/customerAuth"));
app.use("/providers", require("./routes/providerAuth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
