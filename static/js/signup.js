document.getElementById("password").addEventListener("keyup", testpassword2);
document.getElementById("password1").addEventListener("keyup", testpassword2);

function testpassword2() {
    // var name = document.getElementById("name");
    var submit = document.getElementById("submit");
    var email = document.getElementById("email");
    var text1 = document.getElementById("password");
    var text2 = document.getElementById("password1");
    var btn = document.getElementById("submit");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    // text1.onclick = function () {
    //     document.getElementById("message").style.display = "inline-block";
    // }

    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (text1.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
        btn.disabled = false;
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (text1.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        btn.disabled = false;
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (text1.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        btn.disabled = false;
    }

    // Validate length
    if (text1.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        btn.disabled = false;
    }

    if (text1.value == text2.value && text1.value.match(lowerCaseLetters)
        && text1.value.match(upperCaseLetters) && text1.value.match(numbers)
        && text1.value.length >= 8) {
        btn.disabled = false;
        // name.classList.add('glow');
        email.classList.add('glow');
        text1.classList.add('glow');
        text2.classList.add('glow');
        submit.classList.add('glow');
        submit.classList.replace('btn-outline-warning', 'btn-outline-success');
    }
    else {
        btn.disabled = true;
        // name.classList.remove('glow');
        email.classList.remove('glow');
        text1.classList.remove('glow');
        text2.classList.remove('glow');
        submit.classList.remove('glow');
        submit.classList.add('glow-red');
        submit.classList.replace('btn-outline-success', 'btn-outline-warning');
    }
    // text2.style.borderColor = "#2EFE2E";
    // text2.style.borderColor = "red";
}