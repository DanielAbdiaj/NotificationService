
import {intializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTaf0XRotgo2RytS1G9YHTj-_i-I_w-u8",
    authDomain: "notificationservice-e7be3.firebaseapp.com",
    projectId: "notificationservice-e7be3",
    storageBucket: "notificationservice-e7be3.appspot.com",
    messagingSenderId: "925018753852",
    appId: "1:925018753852:web:e366eae96c58fdcab6ac39"
  };


  //init firebase
  intializeApp(firebaseConfig);

  //init firestore
  const firestore=getFirestore()

  export {firestore}
