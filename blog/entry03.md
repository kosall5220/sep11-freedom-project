# Entry 3
##### 2/3/25

### Context
As of now I am still learning about my tool. Over the winter break I attempted to make a to-do list app and this is everyting I did so far:

---
### EDP

As of now I am still on the planing stage (stage 4) of the Engineering Design Process. For now I am trying to get used to using my tool while creating apps/websites so I fully know how I should use it for my project.

---

### Starting the project (to-do list app)

#### Task
My task is to create a database on the Firebase website to hold the user's tasks. Then I will implement this database into my website so it can be changed and manipulated.

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

### Code didn't work?
When I look at the console the array did not show up. This is what showed up instead:

![image](../imgs/error.png)

Error messages showed up, and since I don't really understand what the error messages I went back to the [“Getting Started With Firebase 9”](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) playlist by Net Ninja for help. I realized I missed a very important step which was installing webpack. According to the [Firebase doc](https://firebase.google.com/docs/web/setup), "The Firebase Web SDK is designed to work with module bundlers to remove any unused code (tree-shaking)" which means Firebase will not work if I don't use a module bunder like webpack. So I had created a new folder for my project and installed webpack on it by writing `$npm i webpack-cli -d` into my terminal.

Now that I have Webpack installed I should see my array inside of my console.

![image](../imgs/fixed.png)

Thankfully it worked and now I can see the documents inside of my console. Next time I will attempt to allow users to edit this array so they could add and delete their tasks.

( *From [learning log 1/6/25](../tool/learning-log.md)* )

---

### Skills

#### Embracing failure:
When I faced an error in my code it was really frustrating since I could not figure out what the error message was saying. Instead of giving up on the task, I took this as an opportunity to learn and I used resources like youtube to help me fix the error. Now that I know I have to install webpack into my IDE before using Firebase I am less likely to make this same mistake again on my future projects.

#### Growth mindset
When working on the to-do list I focused on learning more about my tool and improving my Javascript skills in general. Focusing on my learning helps me develop a mindset where I am constantly looking to improve myself, as I continue to learn about Firebase hopefully my growth mindset becomes stronger.




[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)
