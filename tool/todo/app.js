// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// const firebaseConfig = {
//     apiKey: "AIzaSyD8qz6lSoUNSFTu4JbB9dSbZiUXe-sxV-Q",
//     authDomain: "to-do-fc29d.firebaseapp.com",
//     projectId: "to-do-fc29d",
//     storageBucket: "to-do-fc29d.firebasestorage.app",
//     messagingSenderId: "268722574316",
//     appId: "1:268722574316:web:a65526ddc8e371c08366c9",
//     measurementId: "G-PPXBX6C68F"
//   };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore();

// async function getTasks(db) {
//   const tasksCol = collection(db, 'tasks');
//   const tasksSnapshot = await getDocs(tasksCol);
//   const taskList = citySnapshot.docs.map(doc => doc.data());
//   return taskList;
// }

// getDocs(tasksCol)
// .then((snapshot)) => {
//   let tasks = []
//   snapshot.docs.forEach((doc) => {
//     tasks.push({...dic.data(), id: doc.id})
//     console.log(tasks)
//   })
// }


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD8qz6lSoUNSFTu4JbB9dSbZiUXe-sxV-Q",
  authDomain: "to-do-fc29d.firebaseapp.com",
  projectId: "to-do-fc29d",
  storageBucket: "to-do-fc29d.firebasestorage.app",
  messagingSenderId: "268722574316",
  appId: "1:268722574316:web:a65526ddc8e371c08366c9",
  measurementId: "G-PPXBX6C68F"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const tasksCol = firebase.firestore().collection('tasks');

tasksCol.get().then(snapshot => {
  let tasks = [];
  snapshot.forEach(doc => tasks.push({...doc.data(), id: doc.id}));
  console.log(tasks);
});
