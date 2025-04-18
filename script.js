import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7rquDnPgGYCy-z9CZOyCT1gYuokA1vFY",
    authDomain: "sep11-freedom-project-e57af.firebaseapp.com",
    projectId: "sep11-freedom-project-e57af",
    storageBucket: "sep11-freedom-project-e57af.appspot.com",
    messagingSenderId: "854302404692",
    appId: "1:854302404692:web:44f91df0d537c642eb3dc1",
    measurementId: "G-GV5S6GXRL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-entry');
    const memoryInput = document.getElementById('memoryInput');
    const entriesList = document.getElementById('entries-list');
    const memoryCount = document.getElementById('memory-count'); // Counter element

    // Function to update the memory count
    async function updateMemoryCount() {
        const snapshot = await getDocs(collection(db, 'entries'));
        memoryCount.textContent = `Total Memories: ${snapshot.size}`;
    }

    // Save a new memory to Firestore
    saveButton.addEventListener('click', async () => {
        const memory = memoryInput.value;

        if (memory) {
            try {
                await addDoc(collection(db, 'entries'), { memory });
                memoryInput.value = ''; // Clear the input field
                updateMemoryCount(); // Update the memory count
            } catch (error) {
                console.error('Error adding memory:', error);
            }
        } else {
            alert('Please write a memory.');
        }
    });

    // Real-time listener to display memories and update the count
    onSnapshot(collection(db, 'entries'), (snapshot) => {
        entriesList.innerHTML = ''; // Clear the list
        snapshot.forEach(docSnapshot => {
            const entry = docSnapshot.data();
            const entryId = docSnapshot.id; // Get the document ID
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry-item');
            entryElement.innerHTML = `
                <p><strong>Memory:</strong> ${entry.memory}</p>
                <button class="delete-btn">Delete</button>
                <hr>
            `;

            // Add delete functionality
            const deleteButton = entryElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async () => {
                try {
                    await deleteDoc(doc(db, 'entries', entryId)); // Delete from Firestore
                    updateMemoryCount(); // Update the memory count
                } catch (error) {
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


