import firebase from "firebase";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAloGYspAGIXto6UzZPDve_0vxjL9mIVdc",
    authDomain: "mead-todo-app-29f4a.firebaseapp.com",
    databaseURL: "https://mead-todo-app-29f4a.firebaseio.com",
    storageBucket: "mead-todo-app-29f4a.appspot.com",
    messagingSenderId: "344090195296"
};
firebase.initializeApp(config);

/**
 * database() : store db information
 *              Gets the Database service for the default app or a given app.
 * ref() : get the reference
 *         A Reference represents a specific location in your Database
 *         and can be used for reading or writing data to that Database location.
 * set() : set the data in the database.
 *         it will override all the data at the current reference
 *         will return promise
 * firebase.database().ref(): root reference
 */
// firebase.database().ref().set({
//     appName: "Todo App",
//     isRunning: true,
//     user: {
//         name: "Andrew",
//         age: 25
//     }
// });

/**
 * Will override the upper data
 */
// firebase.database().ref().set({
//     appName: "Todo Application"
// });

var firebaseRef = firebase.database().ref();
firebaseRef.set({
    app: {
        name: "Todo App",
        version: "1.0.0"
    },
    isRunning: true,
    user: {
        name: "Andrew",
        age: 25
    }
}).then(() => {
    console.log("Set worked!");
}, (e) => {
    console.log("Set failed!");
});


// firebaseRef.set({
//     app: {
//         name: "Todo Application"
//     }
// });

/* tell which child we want to reference
 only wipe at the data at the reference point */
// firebaseRef.child("user").set({
//     name: "Mike"
// });

/*********************** Update ****************************/
/**
 * Update nested data: (2 way)
 * 1. Multi-Path update
 * 2. Child update
 */
 /* 1. Multi-Path update */
// firebaseRef.update({
//     isRunning: false,
//     "app/name": "Todo Application"
// });
/* 1. Multi-Path update */
// firebaseRef.update({
//     "app/name": "Todo Application",
//     "user/name": "Jen"
// });

/* 2. child update */
// firebaseRef.child("app").update({
//     name: "Todo Application"
// }).then(() => {
//     console.log("Update worked!");
// }, (e) => {
//     console.log("Update failed!");
// });
/* 2. child update */
// firebaseRef.child("app").update({
//     name: "Todo Application"
// });
// firebaseRef.child("user").update({
//     name: "Jen"
// });



/*********************** Remove ****************************/
/*Remove all the data in the db*/
// firebaseRef.remove();

// firebaseRef.child("app/name").remove();

/**
 * we can also remove item by using update value to null
 */
// firebaseRef.child("app").update({
//     version: "2.0",
//     name: null
// });

/**
 * once:
 * Listens for exactly one event of the specified event type, and then stops listening.
 *
 * here, tell firebase to fetch all of the data available at the current reference
 * since we are using root reference, we'll fetch entire database
 */
// firebaseRef.once("value").then((snapshot) => {
//     console.log("Got entire database", snapshot.val());
// }, (e) => {
//     console.log("Unable to fetch value", e);
// });

// firebaseRef.child("app").once("value").then((snapshot) => {
//     console.log("Got entire database", snapshot.key, snapshot.val());
// }, (e) => {
//     console.log("Unable to fetch value", e);
// });

/**
 * on:
 * Listens for data changes at a particular location.
 * Listens for more than just one trigger event,
 * everytime db changes, we can do something with that data.
 */
// var logData = (snapshot) => {
//     console.log("Got value", snapshot.val());
// };
// firebaseRef.on("value", logData);

/** 
 * turn off the listener 
 * 
 * when you pass the function in,
 * it means that you just remove that listener
 * if there's no argument, it means that every listener will be removed
 */
// firebaseRef.off();
// firebaseRef.off(logData);

// firebaseRef.update({isRunning: false});


/**
 * firebase 處理array的方式:
 * 正常來說(javascript)
 *     firebaseRef.set({
 *         todos: [
 *             {
 *                 id: "123bacds",
 *                 text: "Film some vids"
 *             }
 *         ]
 *     })
 * 但 firebase 不是這樣, 而是從key-value的角度出發:
 *     firebaseRef.set({
 *         todos: {
 *             "123bacds": { // "123bacds" 就是我們的 id
 *                 text: "Film some vids"
 *             }
 *         }
 *     })
 */
 var notesRef = firebaseRef.child("notes");

/**
 * child_added event:
 * This event will be triggered once for each initial child at this location, 
 * and it will be triggered again every time a new child is added. 
 */
 notesRef.on("child_added", (snapshot) => {
    console.log("child_added", snapshot.key, snapshot.val());
 });

 notesRef.on("child_changed", (snapshot) => {
    console.log("child_changed", snapshot.key, snapshot.val());
 });

 notesRef.on("child_removed", (snapshot) => {
    console.log("child_removed", snapshot.key, snapshot.val());
 });
 /* 
  * make a new note 
  * push:
  *     create a new item at the current reference, in this case: "notesRef"
  *     and return the new reference to you, and you can set the new data on it
  */
 // var newNoteRef = notesRef.push();
 // newNoteRef.set({
 //    text: "Walk the dog"
 // });
 /* the upper code is the same as the following: */
 var newNoteRef = notesRef.push({
    text: "Walk the dog"
 });
 console.log("Todo id", newNoteRef.key);



 var todosRef = firebaseRef.child("todos");

 todosRef.on("child_added", (snapshot) => {
    console.log("New todo added", snapshot.key, snapshot.val());
 });

 todosRef.push({
    text: "Todo 1"
 });

 todosRef.push({
    text: "Todo 2"
 })