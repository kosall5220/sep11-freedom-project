
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA7rquDnPgGYCy-z9CZOyCT1gYuokA1vFY",
    authDomain: "sep11-freedom-project-e57af.firebaseapp.com",
    databaseURL: "https://sep11-freedom-project-e57af-default-rtdb.firebaseio.com",
    projectId: "sep11-freedom-project-e57af",
    storageBucket: "sep11-freedom-project-e57af.firebasestorage.app",
    messagingSenderId: "854302404692",
    appId: "1:854302404692:web:44f91df0d537c642eb3dc1",
    measurementId: "G-GV5S6GXRL0"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var analytics = getAnalytics(app);



var addEntryForm = document.querySelector('.add');
addEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(collection(db, 'entries'), {
        memory: addEntryForm.memory.value,
        date: addEntryForm.date.value,
    }).then(() => {
        addEntryForm.reset();
    });
});

var deleteEntryForm = document.querySelector('.delete');
deleteEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, 'entries', deleteEntryForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteEntryForm.reset();
    });
});

var colRef = collection(db, 'entries');

var memoryText = "special memory";
var q = query(colRef, where("memory", "==", memoryText));


onSnapshot(q, (snapshot) => {
    var entries = [];
    snapshot.docs.forEach((doc) => {
        entries.push({ ...doc.data(), id: doc.id });
    });
    console.log(entries);
});
