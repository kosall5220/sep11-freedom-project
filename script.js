import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// References
const entriesList = document.getElementById('entries-list');
const saveEntryButton = document.getElementById('save-entry');
const memoryInput = document.getElementById('memoryInput');
const dateInput = document.getElementById('dateInput');

// Add a new entry to the Realtime Database
saveEntryButton.addEventListener('click', async () => {
    if (memoryInput.value && dateInput.value) {
        try {
            const newEntryRef = database.ref('entries').push();
            await newEntryRef.set({
                memory: memoryInput.value,
                date: dateInput.value
            });
            memoryInput.value = '';
            dateInput.value = '';
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        alert("Both fields are required.");
    }
});

// Query and display entries from the Realtime Database in real-time
database.ref('entries').on('value', (snapshot) => {
    entriesList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const entry = childSnapshot.val();
        const entryItem = document.createElement('div');
        entryItem.innerHTML = `
            <p>${entry.memory} - ${entry.date}</p>
            <button onclick="deleteEntry('${childSnapshot.key}')">Delete</button>
        `;
        entriesList.appendChild(entryItem);
    });
});

// Delete an entry from the Realtime Database
window.deleteEntry = async (id) => {
    try {
        await database.ref('entries').child(id).remove();
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
