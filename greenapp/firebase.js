// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8GP7wi4P3XCsmq00T3SrNI9o0F0Fjr6U',
  authDomain: 'green-space-optimizer.firebaseapp.com',
  projectId: 'green-space-optimizer',
  storageBucket: 'green-space-optimizer.appspot.com',
  messagingSenderId: '615300099932',
  appId: '1:615300099932:web:3220105b887d2430ee1b99',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
