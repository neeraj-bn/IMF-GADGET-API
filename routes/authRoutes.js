const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// User Registration
router.post(
  "/register",
  [body("username").notEmpty(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering user", error });
    }
  }
);

// User Login
router.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user)
        return res
          .status(400)
          .json({ message: "Invalid username or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Invalid username or password" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }
);

module.exports = router;
