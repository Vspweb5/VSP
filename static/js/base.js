var username = document.getElementById("username");
var logout1 = document.getElementById("out1");
var logout2 = document.getElementById("out2");
var login1 = document.getElementById("in1");
var login2 = document.getElementById("in2");
var login3 = document.getElementById("in3");

console.log(username.innerText)

if (username.innerText == "null" || username.innerText == null || username.innerText == "") {
    logout1.classList.remove("logged");
    logout2.classList.remove("logged");
    login1.classList.add("logged");
    login2.classList.add("logged");
    login3.classList.add("logged");
}
else {
    logout1.classList.add("logged");
    logout2.classList.add("logged");
    login1.classList.remove("logged");
    login2.classList.remove("logged");
    login3.classList.remove("logged");
}