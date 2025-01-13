
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAYUmDx6ViWd-AtfTeZI7-QzjPPqwropMU",
    authDomain: "todo-a4ce6.firebaseapp.com",
    projectId: "todo-a4ce6",
    storageBucket: "todo-a4ce6.firebasestorage.app",
    messagingSenderId: "1058054418958",
    appId: "1:1058054418958:web:af1d1e51f0b1d462aec25f"
  };

  initializeApp(firebaseConfig)

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db, 'tasks')

  // get collectiom data
  getDocs(colRef)
    .then((snapshot) => {
        let tasks = []
        snapshot.docs.forEach((doc) => {
            tasks.push({...doc.data(), id: doc.id })
        })
        console.log(tasks)
    })
    .catch(err => {
        console.log(err.message)
    })
