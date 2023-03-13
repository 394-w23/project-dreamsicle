// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { useEffect, useState, useCallback } from 'react';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: ""
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyDB3F9ZbgSz8fkJ4-XU7lPsk43A7w9_bWU",
    authDomain: "project-dreamsicle.firebaseapp.com",
    databaseURL: "https://project-dreamsicle-default-rtdb.firebaseio.com",
    projectId: "project-dreamsicle",
    storageBucket: "project-dreamsicle.appspot.com",
    messagingSenderId: "233112252596",
    appId: "1:233112252596:web:21b88721f5168da89167e1",
    measurementId: "G-HQ9QGB4353"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
}

export const getDbStorage = () => {
  return storage;
}

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};
