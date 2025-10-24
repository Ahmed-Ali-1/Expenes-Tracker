var users = JSON.parse(localStorage.getItem("userData")) || []

function signUp() {
    var userName = document.getElementById("userName").value
    var userEmail = document.getElementById("userEmail").value
    var userPassword = document.getElementById("userPassword").value

    var id;

    if (users.length == 0) {
        id = 1
    } else {
        id = users[users.length - 1].id + 1
    }

    var userObj = {
        id: id,
        Name: userName,
        Email: userEmail,
        Password: userPassword
    }
    users.push(userObj)

    localStorage.setItem("userData", JSON.stringify(users))
    location.href = "./login.html"

}

function logIn() {
    var loginEmail = document.getElementById("loginEmail").value
    var loginPassword = document.getElementById("loginPassword").value

    var isfound = false
    for (var index in users) {
        var user = users[index]
        if (user.Email == loginEmail && user.Password == loginPassword) {
            alert("Login Successfully!")
            isfound = true
            localStorage.setItem("currentUser", JSON.stringify(user))
            location.href = "./expense.html"
        }
    }
    if (!isfound) {
        alert("User not found!")
    }
}
