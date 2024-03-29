
const cafeList = document.querySelector('#cafe-list')

// * create elemnt and render cafe
function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'X';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li); 

  // * deleting data
  cross.addEventListener("click", (e)=> {
    e.stopPropagation;
    let id = e.target.parentElement.getAttribute('data-id');
    

  })
}