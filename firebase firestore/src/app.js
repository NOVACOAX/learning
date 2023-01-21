// * Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, doc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { getAuth, } from 'firebase/auth'
// * For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbiYtXgJp0QCRWrCMjDfTYkgqE5Cj7s98",
  authDomain: "pagination-scroll-1ea14.firebaseapp.com",
  projectId: "pagination-scroll-1ea14",
  storageBucket: "pagination-scroll-1ea14.appspot.com",
  messagingSenderId: "187132417844",
  appId: "1:187132417844:web:1601663abf9f4b1ceab761",
  measurementId: "G-W7K66VF703"
};

// * Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// * init service 
const db = getFirestore()
const auth = getAuth()

// * collection ref
const colRef = collection(db, 'cafe')

// * making queries
const q = query(colRef, where('city', '==', 'Kikuyu'));
const q2 = query(colRef, orderBy("city"));

// * get data 
// getDocs(colRef)
// getDocs(q2)
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       renderCafe(doc)
//     });
//   })
//   .catch(err => {
//     console.log(err.message);
//   })

// * real time data collection
onSnapshot(q2, (snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type == 'added' ){
      renderCafe(change.doc);
    }else if(change.type == 'removed'){
      let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
      cafeList.removeChild(li);
    }
  })
  // snapshot.docs.forEach(doc => {
  //   renderCafe(doc)
  // });
})

// * add new documents
const form = document.querySelector('#add-cafe-form')
form.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    name: form.name.value,
    city: form.city.value,
  })
    .then(() => {
      console.log('New item added.')
      form.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});




const cafeList = document.querySelector('#cafe-list')

// * create elemnt and render cafe
function renderCafe(cafe) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', cafe.id);
  name.textContent = cafe.data().name;
  city.textContent = cafe.data().city;
  cross.textContent = 'X';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // * deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation;
    let id = e.target.parentElement.getAttribute('data-id');

    deleteDoc(doc(db, 'cafe', id))
      .then(() => {
        console.log('Deleted successfully')
      })
      .catch(err => {
        console.log(err.message)
      })

  })
}