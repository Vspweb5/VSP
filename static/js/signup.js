document.getElementById("password").addEventListener("keyup", testpassword2);
document.getElementById("password1").addEventListener("keyup", testpassword2);

function testpassword2() {
    var text1 = document.getElementById("password");
    var text2 = document.getElementById("password1");
    var btn = document.getElementById("submit");
    if (text1.value == text2.value)
        btn.disabled = false;
    else
        btn.disabled = true;
    // text2.style.borderColor = "#2EFE2E";
    // text2.style.borderColor = "red";
}