# Entry 2
##### 12/9/24

### Context
As of now, I a still taking steps to learn about my tool Firebase. To continue to learn I watched more videos from [“Getting Started With Firebase 9”](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) playlist by Net Ninja on youtube.

### Learning

#### Adding documents to database
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

#### Real time data collection
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
The code listens for real-time updates to a Firestore collection. Then processes the documents whenever the collection changes, and logs the processed data into the console. It then turns each Firestore document into an object with the document's data and its ID, and stores those objects in the books array.

* `onSnapshot()`: Listens for real-time updates to the firebase collection

* `colRed` is the reference to the Firestore collection

* `let books = []` creates an empty array which stores the data collected in the database

* `snapshot.docs` holds all the documents in the collection at the moment the snapshot was taken.

* `{ ...doc.data(), id: doc.id }` creates a new object that contains all of the document data and adds a new id which gets set to `doc.id`. This new object gets pushed into the books array.

* `doc.data()` returns the data of the document into the books array

#### Firestore Queries

#### What are Firestore Queries?
Firestore Queries are used to filter a collection to only have a specific type of document. For example if I wanted to only have books with the author Patrick Rothfuss in my collection I would have to use queries to fetch only the documents with "patrick rothfuss".

#### Writing code to do this:
First, I had to add two new functions call `queries` and `where`.

```js
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where // New code is on this line
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBYQHPMys5ykuDu7Z94hPAAwoueF3BSQcE",
    authDomain: "fir-9-test-1.firebaseapp.com",
    projectId: "fir-9-test-1",
    storageBucket: "fir-9-test-1.appspot.com",
    messagingSenderId: "665870590130",
    appId: "1:665870590130:web:816761dc5ab86e0e2529ab"
  };
```
Then I made a `const` called `q` and set its value to the function `query()`. This function will have two agruments in it which are `colRef` and `where("author", "==" "patrick rothfuss")`.

```js
// collection ref
  const colRef = collection(db, `books`)

// queries
  const q = query(colRef, where("author", "==", "patrick rothfuss"))
```

Now only books with the author "patrick rothfuss" will appear in the array:
![](../imgs/test3.png)

Last, I just replaced colRef with `q` in my realtime database so the function would only activate when the book has the author patrick rothfuss.

```js
// Real time  collection data

  onSnapshot(q, (snapshot) => {}) // change is here
  let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})

    })
    console.log(books)
```
Now the user could only add a book to the collection if it has the author patrick rothfuss and if it doesn't that book would not be added to the collection.

#### full code (only the parts that I added code to):
```js
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
```

##### How code works:

`query`: function that holds the query.

`where`: A function that allows you to filter documents in a collection based on a field condition.

`q`: This is a query which fetch documents from the books collection where the author field is equal to "patrick rothfuss".

`where("author", "==", "patrick rothfuss")`: filters the data

`onSnapshot(q, (snapshot) => {...})`: When any changes occur in the books collection where the author is "patrick rothfuss", the data in the collection will be updated.

#### example:
![](../imgs/test3-2.png)

### Summary
So far I learned how to add documents to my database, collect data in real time, and firebase queries.

### Next steps
Now I plan to create my own mini project (a to-do list) with Firebase over winter break.

[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
