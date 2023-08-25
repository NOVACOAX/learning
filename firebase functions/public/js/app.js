// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-functions.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2RJMr_qveJTHnBZfUH3iFZ0Dl30vTH9Q",
  authDomain: "learn-firebase-db8d1.firebaseapp.com",
  projectId: "learn-firebase-db8d1",
  storageBucket: "learn-firebase-db8d1.appspot.com",
  messagingSenderId: "922877484653",
  appId: "1:922877484653:web:9bab9d9652b1aa6597e964",
  measurementId: "G-TGLSY2YX1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);
const firestore = getFirestore(app);
const auth = getAuth();


const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');

// open request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// // Say hello function call
// const button = document.querySelector('.call');
// button.addEventListener('click', () => {
//   // Get function ref
//   const sayHello = httpsCallable(functions, 'sayHello');
//   sayHello({name: 'Lucy'}).then((result) => {
//     // Read result of the Cloud Function.
//     console.log(result.data);
//   });
// });

// Auth
const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOutBtn = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log('registered', user);
      registerForm.reset();
    })
    .catch(error => {
      registerForm.querySelector('.error').textContent = error.message;
    });
});

// login form
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log('logged in', user);
      loginForm.reset();
    })
    .catch(error => {
      loginForm.querySelector('.error').textContent = error.message;
    });
});

// sign out
signOutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => console.log('signed out'));
});

// auth listener
getAuth().onAuthStateChanged(user => {
  if (user) {
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));
  } else {
    authWrapper.classList.add('open');
    authModals[0].classList.add('active');
  }
});

// add new request
const requestForm = document.querySelector(".new-request form");

requestForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  const addRequest = httpsCallable(functions, 'addRequest');
  addRequest({text: requestForm.request.value})
  .then(() => {
    requestForm.reset();
    requestModal.classList.remove('open');
    requestForm.querySelector('.error').textContent = '';
  })
  .catch((error)=>{
    requestForm.querySelector('.error').textContent = error.message;
  });
});

// // output data
// const ref = collection(firestore, 'requests');
// onSnapshot(ref, (snapshot) =>{
//   // console.log(snapshot);

//   let requests = [];
//   snapshot.forEach(doc => {
//     requests.push({...doc.data(), id: doc.id});
//   });
//   // console.log(requests);

//   let html = '';
//   requests.forEach(request => {
//     html += `<li>${request.text}</li>`
//   });
//   document.querySelector('ul').innerHTML = html;
// });

// output data using Vue.js
const vueApp = createApp({
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    const ref = collection(firestore, 'requests');
    onSnapshot(query(ref, orderBy('upvotes', 'desc')), (snapshot) => {
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({...doc.data(), id: doc.id});
      });
      this.requests = requests;
    });
  },
  methods:{
    upvoteRequest(id){
      // console.log(id);
      const upvote = httpsCallable(functions, 'upvote');
      upvote({id}).catch((e)=>{
        // console.log(e.message);
        showNotification(e.message)
      });
    }
  }
});

vueApp.mount('#app');

// notification
const notification = document.querySelector('.notification');
const showNotification = (message)=>{
  notification.textContent = message;
  notification.classList.add('active');
  setTimeout(()=>{
    notification.classList.remove('active');
    notification.textContent = '';
  }, 3000);
}