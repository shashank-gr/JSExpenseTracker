const form = document.querySelector("#form");

//adding event listners to the each expense list item
const onClick = async (e) => {
  e.preventDefault();
  if (e.target.textContent == "Edit") {
    const id = e.target.parentElement.childNodes[1].value;
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3600/${id}`);
      document.querySelector("#amount").value = response.data.amount;
      document.querySelector("#details").value = response.data.description;
      document.querySelector("#category").value = response.data.category;
      document.querySelector("#expense-id").value = response.data.id;
      e.target.parentElement.remove();
    } catch (err) {
      console.log(err);
    }
  } else if (e.target.textContent == "Delete") {
    const id = e.target.parentElement.childNodes[1].value;
    try {
      const response = await axios.delete(`http://localhost:3600/${id}`);
      e.target.parentElement.remove();
      console.log(response.data.msg);
    } catch (error) {
      error.response ? console.log(error.response.data) : console.log(error);
    }
  }
};

//to display each individual expense on client
const displayExpense = ({ id, amount, description, category }) => {
  let ul = document.querySelector(".list");

  let li = document.createElement("li");
  li.classList = "list-group-item";

  let input = document.createElement("input");
  input.type = "hidden";
  input.value = id;

  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.className = "btn btn-danger float-end";
  btnEdit.className = "btn btn-light float-end";
  btnEdit.textContent = "Edit";
  btnDel.textContent = "Delete";

  li.appendChild(
    document.createTextNode(`${amount} ${description} ${category}`)
  );
  li.appendChild(input);
  li.insertAdjacentElement("beforeend", btnDel);
  li.insertAdjacentElement("beforeend", btnEdit);
  li.addEventListener("click", onClick);
  ul.insertAdjacentElement("beforeend", li);
};

//to update a expense
const updateProduct = async (id, expense) => {
  try {
    const response = await axios.patch(`http://localhost:3600/${id}`, expense);
    displayExpense(response.data.expense);
    console.log(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

//to either save a new expense or update a existing expense based on whether id is present or not
const sendData = async (e) => {
  e.preventDefault();
  const expenseAmount = document.querySelector("#amount");
  const expenseDetail = document.querySelector("#details");
  const expenseCategory = document.querySelector("#category");
  const expenseId = document.querySelector("#expense-id").value;
  if (expenseId) {
    const expense = {
      id: expenseId,
      amount: expenseAmount.value,
      description: expenseDetail.value,
      category: expenseCategory.value,
    };
    updateProduct(expenseId, expense);
    expenseAmount.value = "";
    expenseDetail.value = "";
    expenseCategory.value = "";
    document.querySelector("#expense-id").value = "";
  } else {
    try {
      const expense = {
        amount: expenseAmount.value,
        description: expenseDetail.value,
        category: expenseCategory.value,
      };
      const response = await axios.post("http://localhost:3600/", expense);
      console.log(response.data.msg);
      displayExpense(response.data.expense);
      expenseAmount.value = "";
      expenseDetail.value = "";
      expenseCategory.value = "";
    } catch (error) {
      error.response ? console.log(error.response.data) : console.log(error);
    }
  }
};

//to get all expense from DB and display on client
const displayAll = async () => {
  try {
    const response = await axios.get("http://localhost:3600/");
    const expensesArr = response.data.expenses;
    expensesArr.forEach((expense) => {
      displayExpense(expense);
    });
    console.log(response.data.msg);
  } catch (error) {}
};
form.addEventListener("submit", sendData);
document.addEventListener("DOMContentLoaded", displayAll);
