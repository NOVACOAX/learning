import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

// * For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2RJMr_qveJTHnBZfUH3iFZ0Dl30vTH9Q",
  authDomain: "learn-firebase-db8d1.firebaseapp.com",
  projectId: "learn-firebase-db8d1",
  storageBucket: "learn-firebase-db8d1.appspot.com",
  messagingSenderId: "922877484653",
  appId: "1:922877484653:web:b64d60c5371c695d97e964",
  measurementId: "G-JC8EDTC2N2"
};

// * init firebase app
initializeApp(firebaseConfig);

// * init service 
const db = getFirestore()
const auth = getAuth()

// * collection ref
const colRef = collection(db, 'books')

// *queries
// const q = query(colRef, where("author", "==", "Brandon"), orderBy("createdAt"))
const q = query(colRef, orderBy("createdAt"))

// * get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     // console.log(snapshot.docs)
//     let books = []
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

// * real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
  // onSnapshot(colRef, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})


// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset()
    })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// * get single doc
const docRef = doc(db, 'books', "Z1R93GhbCyu9Dx6ko7iy")
// getDoc(docRef)
// .then((doc)=>{
//   console.log(doc.data(), doc.id)
// })
const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// * updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'goosebumps'
  })
    .then(() => {
      updateForm.reset()
    })
})

// * signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// *  logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// * subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) =>{
  console.log('User status changed', user)
})

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})