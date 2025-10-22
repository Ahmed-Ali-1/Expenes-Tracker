var localData = JSON.parse(localStorage.getItem('transactions'));
// var transactions = localData !== null ? localData : [];


let income = 1000;
let balance = 1000;
let expense = 0;
var transactions = []

var yourBalance = document.getElementById("yourBalance")
var yourExpense = document.getElementById("yourExpense")
var textInput = document.getElementById("textInput")
var amountInput = document.getElementById("amountInput")
const transactionList = document.getElementById("transactionList");

function addTransac() {
    var desc = textInput.value.trim();
    var amount = Number(amountInput.value);

    if (desc === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount");
        return;
    }
    var transaction = {
        id: Math.floor(Math.random() * 100000),
        text: textInput.value,
        amount: Number(amountInput.value)
    };
    transactions.push(transaction);
    updateLocalStorage()


    expense += amount;
    balance -= amount;

    yourBalance.innerText = `$${balance.toFixed(2)}`;
    yourExpense.innerText = `$${expense.toFixed(2)}`;

    textInput.value = "";
    amountInput.value = "";

    var row = document.createElement("tr");
    row.innerHTML = `
    <td>${new Date().toLocaleDateString()}</td>
    <td>${desc}</td>
    <td>-${amount}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

    var deleteBtn = row.querySelector(".delete-btn");

    deleteBtn.onclick = function () {
        balance += amount;
        expense -= amount;
        yourBalance.innerText = `$${balance.toFixed(2)}`;
        yourExpense.innerText = `$${expense.toFixed(2)}`;
        row.remove();
    };

    transactionList.appendChild(row);




}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}




