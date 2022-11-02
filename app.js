/*
API requests : https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails
*/

const form = document.querySelector("form");

//displayStoredDetails: runs when DOM is loaded to get the details from server to display on screen
const displayStoredDetails = () => {
  axios
    .get(
      "https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails"
    )
    .then((res) => {
      const allExpenses = res.data;
      allExpenses.forEach((expense) => {
        display(expense);
      });
    })
    .catch((err) => {
      console.error(err);
    });
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
  li.addEventListener("click", (e) => {
    e.preventDefault();

    //Edit functionality--->make axios call,get expense obj, put the details in input, delete the obj in server and screen
    if (e.target.className == "btn btn-danger float-end") {
      let key = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");
      axios
        .get(
          "https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails"
        )
        .then((res) => {
          const allExpenses = res.data;
          allExpenses.forEach((expense) => {
            if (
              key ==
              expense.amount +
                expense.detail.split(" ").join("") +
                expense.category
            ) {
              axios
                .delete(
                  `https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails/${expense._id}`
                )
                .then((res) => {
                  e.target.parentElement.remove();
                  console.log("deleted from backend");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });

      //Delete functionality-->make axios call, delete from server, delte from screen
    } else if (e.target.className == "btn btn-light float-end") {
      let expenseAmount = document.querySelector("#amount");
      let expenseDetails = document.querySelector("#details");
      let expenseCategory = document.querySelector("#category");
      let key = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");
      axios
        .get(
          "https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails"
        )
        .then((res) => {
          const allExpenses = res.data;
          allExpenses.forEach((expense) => {
            if (
              key ==
              expense.amount +
                expense.detail.split(" ").join("") +
                expense.category
            ) {
              expenseAmount.value = `${expense.amount}`;
              expenseDetails.value = `${expense.detail}`;
              expenseCategory.value = `${expense.category}`;
              e.target.parentElement.remove();
              axios
                .delete(
                  `https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails/${expense._id}`
                )
                .then((res) => {
                  console.log("deleted from backend");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

//onSubmit: is afunction to post the details to backend server and update on screen
const onSubmit = (e) => {
  e.preventDefault();
  let expenseAmount = document.querySelector("#amount");
  let expenseDetails = document.querySelector("#details");
  let expenseCategory = document.querySelector("#category");
  const expense = {
    amount: expenseAmount.value,
    detail: expenseDetails.value,
    category: expenseCategory.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/e130aa2060454a02b10bc5d7790fdcd9/expenseDetails",
      expense
    )
    .then((res) => {
      console.log("post successful");
    })
    .catch((err) => {
      console.error(err);
    });

  display(expense);
  expenseAmount.value = "";
  expenseCategory.value = "";
  expenseDetails.value = "";
};
form.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", displayStoredDetails);
