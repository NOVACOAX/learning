// * Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// * For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbiYtXgJp0QCRWrCMjDfTYkgqE5Cj7s98",
  authDomain: "pagination-scroll-1ea14.firebaseapp.com",
  projectId: "pagination-scroll-1ea14",
  storageBucket: "pagination-scroll-1ea14.appspot.com",
  messagingSenderId: "187132417844",
  appId: "1:187132417844:web:617053e763ca5de7eab761",
  measurementId: "G-KHXJ0CC5CH"
};

// * Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// * init service 
const db = getFirestore()
const auth = getAuth()


// * collection ref
const colRef = collection(db, 'guides')
const userRef = collection(db, 'users')


// * Listen for auth state change 
onAuthStateChanged(auth, user => {
  if (user) {
    console.log('User logged in:', user)
    getDoc(doc(db, 'users', user.uid))
    .then(bio => {
      // console.log(bio.data())
      setupUI(user,bio.data())
    })
    // * Get data 
    onSnapshot(colRef, (snapshot) => {
      setupGuides(snapshot.docs)
    })
  } else {
    console.log('User logged out')
    setupUI()
    setupGuides([])
  }
})

// * create new guide
const createForm = document.querySelector('#create-Form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    title: createForm.title.value,
    content: createForm.content.value
  })
    .then(() => {
      const modal = document.querySelector('#modal-create')
      M.Modal.getInstance(modal).close();
      createForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// * signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return setDoc(doc(db, "users", cred.user.uid),{
        bio: signupForm.bio.value
      })
    }).then(() => {
      // console.log('user created:', cred.user)
      const modal = document.querySelector('#modal-signup')
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// *  logging out
const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
  signOut(auth)
    .catch(err => {
      console.log(err.message)
    })
})

// * login 
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      // console.log('user logged in:', cred.user)
      const modal = document.querySelector('#modal-login')
      M.Modal.getInstance(modal).close();
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})


