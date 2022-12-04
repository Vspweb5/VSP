var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var upVid = document.querySelector(".upVid");
var Upbutton = document.getElementById("upbtn");
var percentVal;
var fileItem;
var fileName;
var fileTitle;
var flag = 0;
var vid = document.querySelector(".vid");
var pgbar = document.getElementById("pgbar");
var username = document.getElementById("username");
var eidtText = document.getElementById("editContent");
var eidtDesc = document.getElementById("editDesc");
var forDesc = document.getElementById("fordesc");
var hideVideo = document.getElementById("addVideo");
var myform = document.getElementById("myform");
// import { getDatabase, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyCV5Ve41CZI5b2j9dexFqQjwH9pdvur5KY",
    authDomain: "vsp-web.firebaseapp.com",
    projectId: "vsp-web",
    storageBucket: "vsp-web.appspot.com",
    messagingSenderId: "76950228191",
    appId: "1:76950228191:web:c83ad1d27d8c333961ed6a",
    databaseURL: "https://vsp-web-default-rtdb.firebaseio.com/",
    measurementId: "G-FH6MYLQEC4"
};

firebase.initializeApp(firebaseConfig);
// const dbRef = firebase.database().ref();
const dbRef = firebase.database().ref('users/' + username.innerText + '/videos');
// const usersRef = dbRef.child('users').child(username.innerText).child('videos');

var match;
function checkLink() {
    var yturl = document.getElementById("yturl");
    var ytplayer = document.getElementById("ytplayer");
    var url = yturl.value;
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            // console.log("url: ", match[2]);
            myinit();
            ytplayer.setAttribute('src', 'https://www.youtube.com/embed/' + match[2]);
            ytplayer.style.display = 'flex';
            flag = 1;
        }
        else {
            // Do anything for not being valid
            alert("Link is not valid!");
        }
    }
}

function previewFile() {
    const preview = document.getElementById('vid');
    preview.style.display = "block";
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert to base64
        preview.src = window.URL.createObjectURL(file);
        vid.currentTime = 1;
        vid.play();
        vid.pause();
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function myinit() {
    myform.style.display = 'none';
    eidtText.style.display = 'block';
    eidtDesc.style.display = 'block';
    Upbutton.style.display = 'block';
    upVid.style.alignItems = 'start';
    Upbutton.classList.add('activ');
    Upbutton.style.cursor = 'pointer';
}

function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileName = fileName.substring(0, 4) + "-" + (new Date()).getTime() + ".mp4";
    // hideVideo.style.display = 'none';
    myinit();
    fileText.value = fileItem.name.replace('.mp4', '');
}

function uploadVideo() {
    fileTitle = fileText.value;
    if ((fileTitle === "" || forDesc.value === "") && (fileTitle.length > 3 && forDesc.length > 3)) {
        alert("Need meaning full Title and Description!");
    }
    else if (flag === 1) {
        var url = match[2];
        var newRef = dbRef.push();
        newRef.set({
            fileURL: url,
            title: fileTitle,
            desc: forDesc.value
        });
        alert("Video Uploaded Successfully!");
        document.location.href = "/upload";
    }
    else {
        pgbar.style.display = 'flex';
        let storageRef = firebase.storage().ref("videos/" + fileName);
        let uploadTask = storageRef.put(fileItem);
        // console.log("title", fileTitle);
        // console.log("description", forDesc.value);

        uploadTask.on("state_changed", (snapshot) => {
            console.log(snapshot);
            percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(percentVal);
            uploadPercentage.innerHTML = percentVal + "%";
            progress.style.width = percentVal + "%";
        }, (error) => {
            console.log("Error is ", error);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                // console.log("URL", url);
                url = url.replace("https://firebasestorage.googleapis.com/v0/b/vsp-web.appspot.com/o/videos%2F", '');
                url = url.split(".mp4?alt=media")[0];
                // console.log("cropped", url);
                // var newRef = usersRef.push();
                var newRef = dbRef.push();
                newRef.set({
                    fileURL: url,
                    title: fileTitle,
                    desc: forDesc.value
                });
                // if (url != "") {
                //     vid.setAttribute("src", url);
                //     vid.style.display = "block";
                // }
                alert("Video Uploaded Successfully!");
                document.location.href = "/upload";
            })
        })
    }
}