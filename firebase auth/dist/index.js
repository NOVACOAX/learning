
const guideList = document.querySelector('.guides')
const accountDetails = document.querySelector('.account-details')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

// * setup UI
const setupUI = (user, bio) => {
  if (user) {
    // * account info
    // const bio = getDoc(doc(db, 'users', user.uid))
    const html = `
    <div>Logged in  as ${user.email}</div>
    <div>${bio.bio}</div>
    `
    accountDetails.innerHTML = html
    // * toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block')
    loggedOutLinks.forEach(item => item.style.display = 'none')

  } else {
    // * hide account info
    accountDetails.innerHTML = ''
    // * toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block')
  }
}

// * setup guides 
const setupGuides = (data) => {
  if (data.length) {
    let html = ''
    data.forEach(doc => {
      const guide = doc.data()
      const li = `<li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">${guide.content}</div>
    </li>`
      html += li
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h4 class="center-align">Login to view guides</h4>'
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

}); 