# Tool Learning Log

## Tool: **Firebase**

## Project: **Time Capsule App**

---

### 10/4/24:
* Today I learned how to get started with firebase by following the first 4 videos from the [“Getting Started With Firebase 9”](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) playlist by Net Ninja on youtube.


### What does firebase do?
Firebase provides backend services such as databases, authentication, file storage, cloud functions, hosting, etc.

#### Why use firebase?
Firebase is useful for developers because it allows them to focus on the front end of their app without having to worry about the backend.

### Creating a database
First I had create a project on the [firebase website](https://firebase.google.com/). Then I created a database by clicking on "Build" then on "Firestore Database". For my database I created a collection called "books". Then I generated documents which would represent a book, these documents will be stored in the collection.

##### The database:
![](../imgs/test1-database.png)

### Accessing Database
To access my database I first had to connect my program to the firebase backend. To do that I used the code: `import { initializeApp } from 'firebase/app'` and `initializeApp(firebaseConfig)`.

* `import { initializeApp } from 'firebase/app'`:
    * `import` is a keyword used to bring in objects, functions, or variables from other **modules**.
        * Modules are pieces of code that provide a specific functionality.
    *  `{ initializeApp }` is a named import that is being imported from `'firebase/app'`

* `initializeApp(firebaseConfig)`
    * This initializes the Firebase application with my specific configuration which is `(firebaseConfig)`
        * This configuration comes from the code:
    ```js
    const firebaseConfig = {
    apiKey: "AIzaSyBYQHPMys5ykuDu7Z94hPAAwoueF3BSQcE",
    authDomain: "fir-9-test-1.firebaseapp.com",
    projectId: "fir-9-test-1",
    storageBucket: "fir-9-test-1.appspot.com",
    messagingSenderId: "665870590130",
    appId: "1:665870590130:web:816761dc5ab86e0e2529ab"
    };
    ```

### Using the database
I wanted to put the information from my database into an array. To do this I used this code:
```js

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
 ```

* `const db = getFirestore()` stores the database into a variable so we can use it.
* `const colRef = collection(db, 'books')` collects data from the collection "books"
* The code below creates a snapshot of all the documents in a collection and pushes the data into an array
```js
 getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
        console.log(books)
        })
  ```

  #### Result:
  ![image](../imgs/arrays1.png)

### Full code:
![image](../imgs/test1.png)

### Next Steps
To quickly sum up what I did today, I learned how to import a database from firebase into my code. Next time I plan to make code to allow users to add and delete documents from the database array.



### X/X/XX:
* Text


<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
