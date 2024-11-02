# Entry 1
##### 10/28/24

### Context
In my SEP11 class, my teacher gave me the opportunity to create anything I want using javascript and a third-party JS tool. My current task is to decide what I want to make and plan out the process for completing this project.

---

### What will I make?

For the “Freedom Project”, I want to make a web application designed to help users preserve their memories and thoughts for the future.

#### Some of the features I thought of so far:
* Memory Entries:
    * Users can make entries to document significant life events, thoughts, or feelings.
 Users could revisit past entries to reflect on growth
* Future Messages:
    * Users can write messages to themselves or loved ones to be delivered on a specific date in the future.

#### Benefits of this project
* Promotes reflection and personal growth.
* Preserves the memories or experiences of the user.

---

### How will I make this?

To make my project I will use a **third-party JS tool** and the **Engineering Design Process**.

### Engineering Design Process (EDP)

Currently I completed steps 1-3 of the EDP which are defining and researching the problem (steps 1-2) and brainstorming solutions (step 3).

I didn’t really follow the steps in order since I first thought about what I wanted to make, and then after that I thought about the problems it could fix.


#### Some problems that my app could help fix
* Loss of important memories
    * The app will provide a way to store memories, reducing the risk of forgetting significant experiences over time.
    * Website about this problem: [annveilleux.com](https://annveilleux.com/articles/the-importance-of-remembering/)
* Lack of reflection
    * The app can encourage users to revisit and reflect on memories
    * Website about this problem: [hbr.org](https://hbr.org/2017/03/why-you-should-make-time-for-self-reflection-even-if-you-hate-doing-it)
* Emotional Well-being
    * The app could help combat feelings of sadness by allowing the user to revisit happy moments
    * Website about this problem: [cdc.gov](https://www.cdc.gov/emotional-well-being/about/index.html)

#### Next step
The next step of the EDP is to plan the most promising solution. I will start to brainstorm and plan out how my app will look and work.

### My Tool

For my project I want to give users the ability to make entries to preserve their memories, but there has to be a way to save these entries. Where would these entries be stored?

To deal with this problem I plan to use the JS tool [Firebase](https://firebase.google.com/). Firebase is a platform developed by Google that provides tools for building or improving applications, such as real-time databases, authentication, hosting, analytics, and file storage. For my app I plan to use Firebase to create a database in order to store all of the user's entries.

#### Learning my tool

Currently I am learning how to use Firebase. I’ve logged my progress in this [learning log](../tool/learning-log.md). Here’s what I’ve learned so far:

 I learned how to get started with firebase by following the first 4 videos from the [“Getting Started With Firebase 9”](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) playlist by Net Ninja on youtube.

##### Why use firebase?
Firebase is useful for developers because it allows them to focus on the front end of their app without having to worry about the backend.

##### Creating a database
First I had create a project on the [firebase website](https://firebase.google.com/). Then I created a database by clicking on "Build" then on "Firestore Database". For my database I created a collection called "books". Then I generated documents which would represent a book, these documents will be stored in the collection.

##### The database:
![](../imgs/test1-database.png)

##### Accessing Database
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

##### Using the database
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

##### Result:
  ![image](../imgs/arrays1.png)

##### Full code:
![image](../imgs/test1.png)

*All of this is from my learning log*

### Skills


[Next](entry02.md)

[Home](../README.md)
