var singupBtn = document.getElementById("singupBtn");

singupBtn.addEventListener("click", function () {
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    var usersArr = JSON.parse(localStorage.getItem("users")) || [];

    var id;

    if (usersArr.length == 0) {
        id = 1;
    } else {
        id = usersArr[usersArr.length - 1].id + 1;
    }

    var user = {
        id, // id: id
        email: userEmail,
        password: userPassword
    }

    usersArr.push(user);

    localStorage.setItem("users", JSON.stringify(usersArr));

    location = "../login/login.html";
})
