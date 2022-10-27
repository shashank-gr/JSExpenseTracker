/*
adding event listner on form to get submit event
adding event listenr on document to get DOMContentLoaded

functions:
onSubmit: take the input values, store in local storage, call the display function to display the details on screen
displayStoredDetails: when DOM content is loaded, it calles the function. which again sends each of the obj in local staorage
to display function.
display: it takes the object, creates necessary DOM elements and append it to DOM.
  ---it add event listeners to the newly created li element for delete and edit functionality
*/

const form = document.querySelector("form");

const displayStoredDetails = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((key) => {
    display(JSON.parse(localStorage.getItem(key)));
  });
};
const display = (obj) => {
  let { amount, detail, category } = obj;

  let ul = document.querySelector(".list");

  let li = document.createElement("li");
  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.classList = "btn btn-danger float-end";
  btnEdit.classList = "btn btn-light float-end";
  btnEdit.textContent = "Edit";
  btnDel.textContent = "Delete";

  li.classList = "list-group-item";
  li.appendChild(document.createTextNode(`${amount} ${detail} ${category}`));
  li.insertAdjacentElement("beforeend", btnDel);
  li.insertAdjacentElement("beforeend", btnEdit);
  ul.insertAdjacentElement("beforeend", li);

  li.addEventListener("click", (e) => {
    if (e.target.textContent == "Delete") {
      let key = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");
      localStorage.removeItem(key);
      e.target.parentElement.remove();
    } else if (e.target.textContent == "Edit") {
      let key = e.target.parentElement.childNodes[0].textContent
        .split(" ")
        .join("");
      let { amount, detail, category } = JSON.parse(localStorage.getItem(key));

      document.querySelector("#amount").value = `${amount}`;
      document.querySelector("#details").value = `${detail}`;
      document.querySelector("#category").value = `${category}`;
      e.target.parentElement.remove();
      localStorage.removeItem(key);
    }
  });
  // btnDel.addEventListener("click", (e) => {
  //   e.target.parentElement.remove();
  // });
  // btnEdit.addEventListener("click", (e) => {
  //   let textArrray =
  //     e.target.parentElement.childNodes[0].textContent.split(" ");
  //   document.querySelector("#amount").value = `${textArrray[0]}`;
  //   document.querySelector("#details").value = `${textArrray[1]}`;
  //   document.querySelector("#category").value = `${textArrray[2]}`;
  //   e.target.parentElement.remove();
  // });
};

const onSubmit = (e) => {
  e.preventDefault();
  let expenseAmount = document.querySelector("#amount");
  let expenseDetails = document.querySelector("#details");
  let expenseCategory = document.querySelector("#category");
  // console.log(expenseAmount, expenseDetails, expenseCategory);
  const expense = {
    amount: expenseAmount.value,
    detail: expenseDetails.value,
    category: expenseCategory.value,
  };
  localStorage.setItem(
    `${expense.amount}${expense.detail.split(" ").join("")}${expense.category}`,
    JSON.stringify(expense)
  );
  display(expense);
  expenseAmount.value = "";
  expenseCategory.value = "";
  expenseDetails.value = "";
};
form.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", displayStoredDetails);
