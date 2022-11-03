/*
API requests : https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails
*/

const form = document.querySelector("form");

//displayStoredDetails: runs when DOM is loaded to get the details from server to display on screen
const displayStoredDetails = async () => {
  try {
    let response = await axios.get(
      "https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails"
    );
    const allExpenses = response.data;
    allExpenses.forEach((expense) => {
      display(expense);
    });
    console.log("page loaded completly");
  } catch (err) {
    console.log(err);
  }
};

//to delete from server
const deleteFromBackend = async (id) => {
  try {
    const response = await axios.delete(
      `https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails/${id}`
    );
    console.log("deleted from server");
  } catch (err) {
    console.log(err);
  }
};

//dispay function takes each object and displays on screen
const display = (obj) => {
  let { amount, detail, category } = obj; //object destructuring

  let ul = document.querySelector(".list");
  let li = document.createElement("li");
  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.className = "btn btn-danger float-end";
  btnEdit.className = "btn btn-light float-end";
  btnEdit.textContent = "Edit";
  btnDel.textContent = "Delete";

  li.classList = "list-group-item";
  li.appendChild(document.createTextNode(`${amount} ${detail} ${category}`));
  li.insertAdjacentElement("beforeend", btnDel);
  li.insertAdjacentElement("beforeend", btnEdit);
  ul.insertAdjacentElement("beforeend", li);

  //adding edit and delete functionality
  li.addEventListener("click", async (e) => {
    e.preventDefault();

    //Edit functionality--->make axios call,get expense obj, put the details in input, delete the obj in server and screen
    if (e.target.className == "btn btn-danger float-end") {
      let id = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");

      try {
        let response = await axios.get(
          "https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails"
        );
        const allExpenses = response.data;
        allExpenses.forEach(async (expense) => {
          if (
            id ==
            expense.amount +
              expense.detail.split(" ").join("") +
              expense.category
          ) {
            await deleteFromBackend(expense._id);
            e.target.parentElement.remove();
            console.log("removed from UI");
          }
        });
      } catch (err) {
        console.log(err);
      }

      //Delete functionality-->make axios call, delete from server, delte from screen
    } else if (e.target.className == "btn btn-light float-end") {
      let id = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");
      try {
        const response = await axios.get(
          "https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails"
        );
        const allExpenses = response.data;
        allExpenses.forEach(async (expense) => {
          if (
            id ==
            expense.amount +
              expense.detail.split(" ").join("") +
              expense.category
          ) {
            document.querySelector("#amount").value = expense.amount;
            document.querySelector("#details").value = expense.detail;
            document.querySelector("#category").value = expense.category;
            await deleteFromBackend(expense._id);
            e.target.parentElement.remove();
            console.log("deleted from UI");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
  console.log("posted on UI");
};

//onSubmit: is afunction to post the details to backend server and update on screen
const onSubmit = async (e) => {
  e.preventDefault();
  let expenseAmount = document.querySelector("#amount");
  let expenseDetails = document.querySelector("#details");
  let expenseCategory = document.querySelector("#category");
  const expense = {
    amount: expenseAmount.value,
    detail: expenseDetails.value,
    category: expenseCategory.value,
  };

  try {
    let response = await axios.post(
      "https://crudcrud.com/api/94a0488895224fbb94a6cc2cb5d6a26f/expenseDetails",
      expense
    );
    console.log("Post successful in backend");
    display(expense);
    expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDetails.value = "";
  } catch (err) {
    console.log(err);
  }
};
form.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", displayStoredDetails);
