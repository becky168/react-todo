import firebase from "firebase";

/**
 * Our firebase database might initialize many times
 * we can use try-catch to ensure it only initialize once.
 */
try {
    // Initialize Firebase
    var config = {
        // apiKey: "AIzaSyAloGYspAGIXto6UzZPDve_0vxjL9mIVdc",
        // authDomain: "mead-todo-app-29f4a.firebaseapp.com",
        // databaseURL: "https://mead-todo-app-29f4a.firebaseio.com",
        // storageBucket: "mead-todo-app-29f4a.appspot.com",
        // messagingSenderId: "344090195296"
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
} catch (e) {}

/*
 * The provider make firebase to know which social plateform you use.
 */
export var githubProvider = new firebase.auth.GithubAuthProvider();
export var firebaseRef = firebase.database().ref();
/**
 * export default root firebase:
 *  to clean up any files that import this one
 */
export default firebase;