import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA7rquDnPgGYCy-z9CZOyCT1gYuokA1vFY",
    authDomain: "sep11-freedom-project-e57af.firebaseapp.com",
    projectId: "sep11-freedom-project-e57af",
    storageBucket: "sep11-freedom-project-e57af.appspot.com",
    messagingSenderId: "854302404692",
    appId: "1:854302404692:web:44f91df0d537c642eb3dc1",
    measurementId: "G-GV5S6GXRL0"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function()  {
    var saveButton = document.getElementById('save-entry'); // Button to save memory
    var memoryInput = document.getElementById('memoryInput'); // Input for memories
    var entriesList = document.getElementById('entries-list'); // List to display memories
    var memoryCount = document.getElementById('memory-count'); // memory counter

    // Function to update the memory count

    async function updateMemoryCount() { // async tells program to wait for the function to finish before moving on
        var snapshot = await getDocs(collection(db, 'entries')); // Get all documents in the 'entries' collection
        memoryCount.textContent = `Total Entires: ${snapshot.size}`; // Update the memory count
        // ${} allows variables to be used in strings
    }

    // Save a new memory to Firestore
    saveButton.addEventListener('click', async function() {
        var memory = memoryInput.value; // Get the value from the input field

        // Check if the input is not empty
        if (memory) {
            try {
                await addDoc(collection(db, 'entries'), { memory }); // waits to see if the document is added
                memoryInput.value = ''; // Clear the input field
                updateMemoryCount(); // Update the memory count
            } catch (error) {
                console.error('Error adding memory:', error); // Log any errors
            }
        } else {
            alert('Please write a memory.'); // Alert if the input is empty
        }
    });

    // Real-time listener to display memories and update the count
    onSnapshot(collection(db, 'entries'), function (snapshot) { // Real-time listener
        entriesList.innerHTML = ''; // Clear the list
        snapshot.forEach(function(docSnapshot) { // Loop through each document
            var entry = docSnapshot.data(); // Get the data from the document
            var entryId = docSnapshot.id; // Get the document ID
            var entryElement = document.createElement('div'); // Create a new div for each entry
            entryElement.classList.add('entry-item'); // Add a class for styling
            entryElement.innerHTML = `
                <p><strong>Memory:</strong> ${entry.memory}</p>
                <button class="delete-btn">Delete</button>
                <hr>
            `; // Add the memory text and a delete button

            // Add delete function
            var deleteButton = entryElement.querySelector('.delete-btn'); // Get the delete button
            deleteButton.addEventListener('click', async function()  { // Add click event
                try {
                    await deleteDoc(doc(db, 'entries', entryId)); // Delete from Firestore
                    updateMemoryCount(); // Update the memory count
                } catch (error) { // Log any errors
                    console.error('Error deleting memory:', error);
                }
            });

            entriesList.appendChild(entryElement); // Add the entry to the list
        });
        updateMemoryCount(); // Update the memory count
    });

    // Initial memory count on page load
    updateMemoryCount();
});


