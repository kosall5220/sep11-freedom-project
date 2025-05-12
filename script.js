

   // Import Firebase modules
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

    // DOM Elements
    document.addEventListener("DOMContentLoaded", function () {
        const saveButton = document.getElementById("save-entry"); // Button to save memory
        const memoryInput = document.getElementById("memoryInput"); // Input for memories
        const entriesList = document.getElementById("entries-list"); // List to display memories
        const memoryCount = document.getElementById("memory-count"); // Memory counter
        const backToTopButton = document.getElementById("back-to-top"); // Back to Top button


        // Memory Count Functionality


        // Function to update the memory count
        async function updateMemoryCount() {
            try {
                const snapshot = await getDocs(collection(db, "entries")); // Get all documents in the "entries" collection
                memoryCount.textContent = `Total Entries: ${snapshot.size}`; // Update the memory count
            } catch (error) {
                console.error("Error updating memory count:", error);
            }
        }

        // Save a new memory to Firestore
        saveButton.addEventListener("click", async function () {
            const memory = memoryInput.value.trim(); // Get the value from the input field and trim whitespace

            if (memory) {
                try {
                    await addDoc(collection(db, "entries"), { memory }); // Add the memory to Firestore
                    memoryInput.value = ""; // Clear the input field
                    updateMemoryCount(); // Update the memory count
                } catch (error) {
                    console.error("Error adding memory:", error);
                }
            } else {
                alert("Please write a memory."); // Alert if the input is empty
            }
        });

        // Real-time listener to display memories and update the count
        onSnapshot(collection(db, "entries"), function (snapshot) {
            entriesList.innerHTML = ""; // Clear the list
            snapshot.forEach(function (docSnapshot) {
                const entry = docSnapshot.data(); // Get the data from the document
                const entryId = docSnapshot.id; // Get the document ID

                // Create a new div for each entry
                const entryElement = document.createElement("div");
                entryElement.classList.add("entry-item"); // Add a class for styling
                entryElement.innerHTML = `
                    <p><strong>Entry:</strong> ${entry.memory}</p>
                    <button class="delete-btn">Delete</button>
                    <hr>
                `;

                // Add delete functionality
                const deleteButton = entryElement.querySelector(".delete-btn");
                deleteButton.addEventListener("click", async function () {
                    const confirmDelete = confirm("Are you sure you want to delete this entry?");
                    if (confirmDelete) {
                        try {
                            await deleteDoc(doc(db, "entries", entryId)); // Delete from Firestore
                            updateMemoryCount(); // Update the memory count
                            console.log("Memory deleted successfully");
                        } catch (error) {
                            console.error("Error deleting memory:", error);
                        }
                    } else {
                        console.log("Memory deletion canceled");
                    }
                });

                entriesList.appendChild(entryElement); // Add the entry to the list
            });
            updateMemoryCount(); // Update the memory count
        });


        // Show the button when the user scrolls down 100px
        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        // Scroll back to the top when the button is clicked
        backToTopButton.addEventListener("click", function () {
            document.documentElement.scrollTop = 0; // Scroll to the top
        });

        // Update memory count on page load
        updateMemoryCount();
    });


