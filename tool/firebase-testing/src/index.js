
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
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
  const colRef = collection(db, 'books')

  // get collection data
  getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
        console.log(books)
    })
  })

  .catch(err => {
    console.log(err.message)
  })
