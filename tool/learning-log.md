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

---

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

---

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

---

### 11/18/24
For today I continue following [Net Ninja's "Getting Started with Firebase 9" playist](https://www.youtube.com/watch?v=9zdvmgGsww0&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&pp=iAQB). I'm now on [episode 7](https://www.youtube.com/watch?v=gEaY2GZMino&ab_channel=NetNinja) which is called "Firestore Queries".

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

#### Summary
Overall, today I learned how to use queries to help filter my collection and the inputs of the users.

---

### 1/6/25

#### task
I started to create my first project(to-do list) with firebase. My plan for today is to make a database to store the tasks of the user.

#### Step 1

First I installed firebase by writing `npm install firebase` into my terminal. Now that I have firebase installed I can connect my database to my website.

#### Step 2

To connect my database I first created an object to hold my firebase configuration. This is kinda like the ID of my database.
```js
const firebaseConfig = {
    apiKey: "AIzaSyAYUmDx6ViWd-AtfTeZI7-QzjPPqwropMU",
    authDomain: "todo-a4ce6.firebaseapp.com",
    projectId: "todo-a4ce6",
    storageBucket: "todo-a4ce6.firebasestorage.app",
    messagingSenderId: "1058054418958",
    appId: "1:1058054418958:web:af1d1e51f0b1d462aec25f"
};
```

### Step 3

After that I initializes the Firebase app to allow my website to retrieves data from my Firestore collection called "tasks".

```js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

initializeApp(firebaseConfig);
```
`collection`: Used to reference the specific collection in Firestore.

`getDocs`: Used to fetch the documents from a Firestore collection.

`initializeApp(firebaseConfig);`: This line initializes the Firebase app

#### Last step (4)

The last thing I have to do is retrieve all of the documents in the "tasks" collection.

```js
getDocs(colRef)
    .then((snapshot) => {
        let tasks = [];
        snapshot.docs.forEach((doc) => {
            tasks.push({...doc.data(), id: doc.id });
        });
        console.log(tasks);
    })
```
`getDocs(colRef)` retrieves all documents in the "tasks" collection.

The `.then()` function is executed if the documents are fetched successfully.

`snapshot.docs` is the array where all the documents are stored

`.forEach` goes through each document, extracts the document's data and adds the document's ID (from doc.id).

Each task is pushed into the `tasks` array, and the array is logged to the console.

#### Code didn't work?
When I look at the console the array did not show up. This is what showed up instead:

![](../imgs/error.png)

Error messages showed up, and since I don't really understand what the error messages I went back to the [“Getting Started With Firebase 9”](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) playlist by Net Ninja for help. I realized I missed a very important step which was installing webpack. According to the [Firebase doc](https://firebase.google.com/docs/web/setup), "The Firebase Web SDK is designed to work with module bundlers to remove any unused code (tree-shaking)" which means Firebase will not work if I don't use a module bunder like webpack. So I had created a new folder for my project and installed webpack on it by writing `$npm i webpack-cli -d` into my terminal.

Now that I have Webpack installed I should see my array inside of my console.

![](../imgs/fixed.png)

Thankfully it worked and now I can see the documents inside of my console. Next time I will attempt to allow users to edit this array so they could add and delete their tasks.

---

### 2/28/25
I continued the todo list project and created code to allow the user to add and delete documents to the Firebase database.

#### Adding

* First I created a form on html to have a place for the user to put their inputs. One text input would be for the task and the other would be for the date of the task.
```js
 <form class = "add">

        <label for = "task">Add:</label>
        <input type="text" name="title" required>
        <label for = "created">The date:</label>
        <input type="text" name="date" required>

        <button>add a task</button>
        </form>
```

* Now I need to make these inputs go somewhere. First I had to use a `querySeletor` to allow changes to be made to the form in JS.

```js
const addTask = document.querySelector(".add");
```
I stored the `querySelector` into a `const` because it's easier to just write `addTask` then to keep on writing `document.querySelector(".add");`.

* Then I used an EventListener to listen for when the form is submitted and run a function once it hears the event.

```js
addTask.addEventListener("submit", (e) => {

        addDoc(colRef, {
            task: addTask.task.value,
            created: addTask.created.value
        })
        .then(() => {
            addTask.reset()
        })
    })
```
When the user hits submit it will add the value of `addTask` into the colRef (the database) and then the form will reset.

Before:
![](../imgs/before-add.png)

After:
![](../imgs/after-add.png)


#### Deleting

* Just like for adding I created a form in HTML for deleting task. The user would have to write the ID of the task and push a button to delete it.

```js
 <form class = "delete">
    <label for="id">Document id</label>
    <input type = "text" name="id" required>
    <button> delete task </button>
  </form>
```

* Then again I used a `querySeletor` to link this form to my JS file and then an `EventListener` to run a function when the form is submitted. This function will find the id of the item in the "tasks" collection and then run a deleteDoc function which deletes the item in the firebase database.

```js
const deleteTask = document.querySelector(".delete");
  deleteTask.addEventListener("submit", (e) => {
      const docRef = doc(db, 'tasks', deleteTask.id.value)
      deleteDoc(docRef)
      .them(() => {
          deleteTask.reset()
      })
  })
```

#### Next steps
I plan to find out what else I can use firebase for outside of just creating a  realtime database.

### 3/13/25

Today I looked through the [Firebase Docs](https://firebase.google.com/docs/build) to see what else I can do with Firebase. Unfortunately I couldn’t try some of these features because I would have to pay for them.

#### Authentication
**Firebase Authentication** – Manage user sign-ins with email/password, phone number, and social logins

### Storage
**Cloud Storage** - Stores user generated content such as images, videos, and audio.

#### Hosting
With firebase you can host global web applications with CDN (Content Delivery Network) &  SSL (Secure Sockets Layer).

* **CDN** - A network of servers that store and deliver website content (like images, scripts, and videos) from locations close to users. This speeds up loading times and improves performance.

* **SSL** - Encrypts data between a user's browser and a website, preventing hackers from having access to sensitive information.

#### Could Functions
* Send things like notifications and emails
* Process Media
* Trigger things in your app by Firebase events

