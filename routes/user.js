const express = require("express");
const controllers = require("../controllers/expense");

const router = express.Router();

router.get("/", controllers.getAllExpenses);
router.post("/", controllers.addExpense);
router.get("/:id", controllers.getExpense);
router.patch("/:id", controllers.updateExpense);
router.delete("/:id", controllers.deleteExpense);

module.exports = router;
