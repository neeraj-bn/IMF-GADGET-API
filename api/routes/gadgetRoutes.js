const express = require("express");
const router = express.Router();
const { Gadget } = require("../../models");
const authMiddleware = require("../../middleware/authMiddleware");


// GET all gadgets
router.get("/",authMiddleware, async (req, res) => {
  const gadgets = await Gadget.findAll();
  const gadgetsWithProbability = gadgets.map((gadget) => ({
    ...gadget.toJSON(),
    successProbability: `${Math.floor(Math.random() * 100)}%`,
  }));
  res.json(gadgetsWithProbability);
});

// POST new gadget
router.post("/",authMiddleware, async (req, res) => {
  const { name } = req.body;
  const gadget = await Gadget.create({ name });
  res.status(201).json(gadget);
});

// PATCH update gadget
router.patch("/:id",authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Gadget.update(req.body, { where: { id } });
  res.json({ message: "Gadget updated" });
});

// DELETE gadget (mark as Decommissioned)
router.delete("/:id",authMiddleware, async (req, res) => {
  await Gadget.update({ status: "Decommissioned" }, { where: { id: req.params.id } });
  res.json({ message: "Gadget decommissioned" });
});

// Self-Destruct
router.post("/:id/self-destruct",authMiddleware, async (req, res) => {
  const confirmationCode = Math.random().toString(36).substring(7).toUpperCase();
  await Gadget.update({ status: "Destroyed" }, { where: { id: req.params.id } });
  res.json({ message: "Gadget self-destructed", confirmationCode });
});

router.get("/",authMiddleware, async (req, res) => {
  const { status } = req.query;
  const whereCondition = status ? { status } : {};
  const gadgets = await Gadget.findAll({ where: whereCondition });
  const gadgetsWithProbability = gadgets.map((gadget) => ({
    ...gadget.toJSON(),
    successProbability: `${Math.floor(Math.random() * 100)}%`,
  }));
  res.json(gadgetsWithProbability);
});



// const authMiddleware = require("../middleware/authMiddleware");
// router.post("/", authMiddleware, async (req, res) => { /* ... */ });
// router.patch("/:id", authMiddleware, async (req, res) => { /* ... */ });
// router.delete("/:id", authMiddleware, async (req, res) => { /* ... */ });
// router.post("/:id/self-destruct", authMiddleware, async (req, res) => { /* ... */ });


module.exports = router;
