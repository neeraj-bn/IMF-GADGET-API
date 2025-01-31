require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { Sequelize } = require("sequelize");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" });

// Import Routes
const gadgetRoutes = require("./routes/gadgetRoutes");
app.use("/gadgets", gadgetRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/user", authRoutes);

app.listen(3000, async () => {
  await sequelize.authenticate();
  console.log("Server running on port 3000");
});


