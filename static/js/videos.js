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

console.log("From Video.js");

firebase.initializeApp(firebaseConfig);
// // on() method
// firebase.database().ref('users').on('email', (snap) => {
//     console.log(snap.val());
// });
// // once() method
// firebase.database().ref('users').on('email', (snap) => {
//     console.log(snap.val());
// });

firebase.database().ref().once('users', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        // ...
        console.log(childData);
    });
});