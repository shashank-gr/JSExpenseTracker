const form = document.querySelector("#form");

const onClick = async (e) => {
  e.preventDefault();
  if (e.target.textContent == "Edit") {
    const id = e.target.parentElement.childNodes[1].value;
    try {
      const response = await axios.get(`http://localhost:3600/${id}`);
      // console.log(response.data);
      document.querySelector("#amount").value = response.data.amount;
      document.querySelector("#details").value = response.data.description;
      document.querySelector("#category").value = response.data.category;
      e.target.parentElement.remove();
    } catch (err) {
      console.log(err);
    }
  } else if (e.target.textContent == "Delete") {
    // console.log(e.target.parentElement);
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

const sendData = async (e) => {
  e.preventDefault();
  const expenseAmount = document.querySelector("#amount");
  const expenseDetail = document.querySelector("#details");
  const expenseCategory = document.querySelector("#category");
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
};
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
