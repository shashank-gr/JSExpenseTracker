const Expense = require("../models/expense");

//to send all expenses from DB
exports.getAllExpenses = (req, res) => {
  Expense.findAll().then((expenses) => {
    res
      .status(200)
      .send({ expenses, msg: "fetch of all expenses from DB sucess" });
  });
};

//to get individual expense by id
exports.getExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      res.status(200).send(expense.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

//to update the expense in DB and send the updated expense
exports.updateExpense = (req, res) => {
  const id = req.params.id;
  Expense.update(
    {
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    },
    {
      where: { id: id },
    }
  )
    .then(() => {
      return Expense.findByPk(id);
    })
    .then((expense) => {
      res.status(200).send({
        expense: expense.dataValues,
        msg: "success updated the expense in DB",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Internal Error", err });
    });
};

//add new expense to DB
exports.addExpense = (req, res) => {
  if (req.body.amount && req.body.description && req.body.category) {
    Expense.create({
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    })
      .then((result) => {
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

//to delete expense by id
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
