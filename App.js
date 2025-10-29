var currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    alert("Please Login first!");
    location = "./login/login.html";
}

let income = 1000;
let balance = 1000;
let expense = 0;

var yourBalance = document.getElementById("yourBalance")
var yourExpense = document.getElementById("yourExpense")
var textInput = document.getElementById("textInput")
var amountInput = document.getElementById("amountInput")
var transactionList = document.getElementById("transactionList");
var openTransactionBtn = document.getElementById("openTransactionBtn");
var addTransactionDiv = document.querySelector(".addTransactionDiv");

openTransactionBtn.addEventListener("click", function () {
    addTransactionDiv.style.display = "block";
    openTransactionBtn.style.display = "none";
})

var addTransaction = document.getElementById("addTransactionBtn")
addTransaction.addEventListener("click", function () {
    var desc = textInput.value.trim();
    var amount = Number(amountInput.value);

    if (!desc || !amount || isNaN(amount)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the fields!",
        });
        return;
    }

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
        <td class="amountRed">-${amount}</td>
        <td><button class="delete-btn">Delete</button></td>`

    var deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.onclick = function () {
        balance += amount;
        expense -= amount;
        yourBalance.innerText = `$${balance.toFixed(2)}`;
        yourExpense.innerText = `$${expense.toFixed(2)}`;
        row.remove();
    };
    transactionList.appendChild(row)

    var usersTransactionsArr = JSON.parse(localStorage.getItem("usersTransactions")) || [];
    var userHistory = {
        id: currentUser.id,
        transactionHistoryArr: []
    }

    var transaction = {
        description: desc,
        value: amount,
        date: new Date().toLocaleDateString()
    }

    userHistory.transactionHistoryArr.push(transaction);
    usersTransactionsArr.push(userHistory);
    localStorage.setItem("usersTransactions", JSON.stringify(usersTransactionsArr));

})