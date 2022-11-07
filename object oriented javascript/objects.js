// * Oject Oriented javascript

// class User{
//     constructor(email, name){
//         this.name = name;
//         this.email  =email;
//         this.score = 0;
//     }
//     login(){
//         console.log(this.email, ' just logged in.');
//         return this;
//     }
//     logout(){
//         console.log(this.email, ' just logged out.');
//         return this;
//     }
//     updateScore(){
//         this.score++;
//         console.log(this.email, 'score is now', this.score);
//         return this;
//     }
// }


// class Admin extends User {
//     deleteUser(user){
//         users = users.filter(u => {
//             return u.email != user.email;
//         })
//     }
// }


// * Old javascript

function User(email, name){
    this.email = email;
    this.name = name;
    this.online = false;
}

User.prototype .login = function(){
    this.online = true;
    console.log(this.email, ' just logged in.');
}
User.prototype .logout = function(){
    this.online = false;
    console.log(this.email, ' just logged out .');
}

function Admin(...args){
    User.apply(this, args);
    this.role = 'Super user';
}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.deleteUser = function(user){
        users = users.filter(u => {
            return u.email != user.email;
        })
}



var userOne = new User('foo@gmail.com', 'foo');
var userTwo = new User('bar@gmail.com', 'bar');
var admin = new Admin('admin@email.com', 'admin');

console.log(admin);
admin.login();

var users = [userOne, userTwo, admin];
admin.deleteUser(userOne);
console.log(users);