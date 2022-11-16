const Expense = require("../models/expense");

//to send all expenses from DB
exports.getAllExpenses = (req, res) => {
  Expense.findAll().then((expenses) => {
    res
      .status(200)
      .send({ expenses, msg: "fetch of all expenses from DB sucess" });
  });
};

//to send just one expense from DB for edit, hence deleteing expense from DB after send
exports.getExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      res.status(200).send(expense.dataValues);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      Expense.destroy({ where: { id } });
    });
};

//add new expense to DB
exports.addExpense = (req, res) => {
  // console.log(req.body);
  if (req.body.amount && req.body.description && req.body.category) {
    Expense.create({
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    })
      .then((result) => {
        // console.log(result);
        res
          .status(200)
          .send({ expense: result.dataValues, msg: "success added to DB" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ msg: "Internal Error", err });
      });
  } else {
    res.status(400).send({ msg: "Enter All Fields" });
  }
};

exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  Expense.destroy({ where: { id } })
    .then(() => {
      res.status(200).send({ msg: "sucess, Deleted expense" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ err, msg: "Delete expense failed" });
    });
};
