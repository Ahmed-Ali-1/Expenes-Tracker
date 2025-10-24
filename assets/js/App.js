var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var saveUserTransaction = "Name: " + currentUser.Name + " || " + "Email: " + currentUser.Email;
var users = JSON.parse(localStorage.getItem(saveUserTransaction)) || [];

let income = 1000;
let balance = 1000;
let expense = 0;
var transactionId = users.length > 0 ? users[users.length - 1].id : 0;

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
    } else {
        expense += amount;
        balance -= amount;

        yourBalance.innerText = `$${balance.toFixed(2)}`;
        yourExpense.innerText = `$${expense.toFixed(2)}`;
        transactionId++;

        textInput.value = "";
        amountInput.value = "";


        var row = document.createElement("tr");
        row.setAttribute("id", transactionId);

        row.innerHTML = `
        <td>${new Date().toLocaleDateString()}</td>
        <td>${desc}</td>
        <td class="amountRed">-${amount}</td>
        <td><button class="delete-btn">Delete</button></td>`;

        var deleteBtn = row.querySelector(".delete-btn");
        deleteBtn.onclick = function () {
            var deleteId = userTransaction.id;

            balance += userTransaction.amount;
            expense -= userTransaction.amount;
            yourBalance.innerText = `$${balance.toFixed(2)}`;
            yourExpense.innerText = `$${expense.toFixed(2)}`;

            for (var i = 0; i < users.length; i++) {
                if (users[i].id === deleteId) {
                    users.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem(saveUserTransaction, JSON.stringify(users))
            row.remove();
        };
        transactionList.appendChild(row)

        var userTransaction = {
            id: transactionId,
            date: new Date().toLocaleDateString(),
            description: desc,
            amount: amount
        }
        users.push(userTransaction)
    }
    localStorage.setItem(saveUserTransaction, JSON.stringify(users))
}



//   id: Math.floor(Math.random() * 100000);