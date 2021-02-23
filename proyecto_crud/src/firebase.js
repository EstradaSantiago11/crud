import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDT8YBgr1uVG0p9mp8K6_8egaIhzth1TV0",
    authDomain: "proyectocrud-9667f.firebaseapp.com",
    projectId: "proyectocrud-9667f",
    storageBucket: "proyectocrud-9667f.appspot.com",
    messagingSenderId: "1066184142895",
    appId: "1:1066184142895:web:dfd28728f4a59861f156da"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)