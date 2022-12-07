var username = document.getElementById("username");
var islogged = document.getElementById("islogged");

if (username.innerText == "null" || username.innerText == null || username.innerText == "") {
    islogged.style.display = 'unset';
}
else {
    islogged.style.display = 'none';
}