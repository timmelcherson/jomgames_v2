import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "./config";

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const categoriesCollection = db.collection("categories");
const wordsCollection = db.collection("words");

export { db, auth, categoriesCollection, wordsCollection };
