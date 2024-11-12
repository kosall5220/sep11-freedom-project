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



### 10/21/24:
* Today I tried to add documents to my database. To do this I watched this [video](https://www.youtube.com/watch?v=s1frrNxq4js&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&index=5&ab_channel=NetNinja) and followed the steps.

#### Adding
First I created a form in my html to allow the user to add an item:

```html
<form class="add">
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" required>

    <label for="author">Author:</label>
    <input type="text" name="author" id="author" required>

    <button>Add a new book</button>
</form>
```
![](../imgs/test2-adding.png)

Then I added this code to my javascript:
```js
// This stores the add form into the const addBookForm
// Is a reference to that form
const addBookForm = document.querySelector('.add')
// Listens for a submit event which happens when the users submits the form
addBookForm.addEventListener('submit', (e) => {
// Stops the page from automatically refreshing
  e.preventDefault()
}
```
The next thing I did was call the `addDoc` function with the arguments `colRef` and the title and author values. The addDoc function is being used to add new documents to my database.
```js
addDoc(colRef, {
  title: addBookForm.title.value,
  author: addBookForm.author.value,
})
```
`colRef` represents my database

`title: addBookForm.title.value` represents the input that the user put in the "title" form

`author: addBookForm.author.value` represents the input that the user put in the "author" form

Lastly, I put the code:
```js
.then(() => {
  addBookForm.reset()
)}
```
This empties the input fields so we can easily type in a new one.

#### Results

This is the inputs
![](../imgs/test2-inputs.png)

This is that input being added to the database

* Original:

![](../imgs/test2-3.png)

* After the input:

![](../imgs/test2-4.png)

![](../imgs/test2-newdata.png)

The one highlighted is the new document added to the database.

### Next steps
My next steps are to write code to delete data from the database and to make the data be collected in real time so you don't have to refresh the page to see the changes.
<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->

### 11/8/24

Today I learned how to collect data in real time, this would allow the user to see any changes made without having refresh the page. To help me learn how to do this I watched [episode 6](https://www.youtube.com/watch?v=rfQ2F8kQEUg&ab_channel=NetNinja) of Net Ninja's [Getting Started with Firebase 9 playlist](https://www.youtube.com/watch?v=9zdvmgGsww0&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&pp=iAQB) and took notes.

Code I used to collect data in real time:
```js
// Real time  collection data

  onSnapshot(colRef, (snapshot) => {})
  let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})

    })
    console.log(books)
  })

```

#### Notes I took from video (code explanation):

* `onSnapshot()`: Listens for real-time updates to the firebase collection

* `colRed` is the reference to the Firestore collection

* `let books = []` creates an empty array which stores the data collected in the database

* `snapshot.docs` holds all the documents in the collection at the moment the snapshot was taken.

* `{ ...doc.data(), id: doc.id }` creates a new object that contains all of the document data and adds a new id which gets set to `doc.id`. This new object gets pushed into the books array.

* `doc.data()` returns the data of the document into the books array

### Summary
The code listens for real-time updates to a Firestore collection. Then processes the documents whenever the collection changes, and logs the processed data into the console. It then turns each Firestore document into an object with the document's data and its ID, and stores those objects in the books array.


