
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBYQHPMys5ykuDu7Z94hPAAwoueF3BSQcE",
    authDomain: "fir-9-test-1.firebaseapp.com",
    projectId: "fir-9-test-1",
    storageBucket: "fir-9-test-1.appspot.com",
    messagingSenderId: "665870590130",
    appId: "1:665870590130:web:816761dc5ab86e0e2529ab"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db, `books`)

  // queries
  const q = query(colRef, where("author", "==", "patrick rothfuss"))

  // Real time  collection data

  onSnapshot(q, (snapshot) => {})
  let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})

    })
    console.log(books)
  })


  // adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
}

addDoc(colRef, {
  title: addBookForm.title.value,
  author: addBookForm.author.value,
})
.then(() => {
  addBookForm.reset()
)}

})

  // deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
})

})
