// * Promise example
// const getTodos = (resource)=>{
//     return new Promise((resolve, reject)=>{
//         const request = new XMLHttpRequest();
        
//         request.addEventListener('readystatechange', () =>{
//             // console.log(request, request.readyState);
//             if(request.readyState === 4 && request.status === 200){
//                 const data = JSON.parse(request.responseText);
//                 resolve(data);
//             }else if(request.readyState === 4){
//                 reject('Could not get the data!');
//             }
//         })
        
//         request.open('GET', resource);
//         request.send();
//     })
// };

// getTodos('todos.json').then(data =>{
//     console.log('Promise 1 resolved.', data);
//     return getTodos('https://jsonplaceholder.typicode.com/todos/');
// }).then(data =>{
//     console.log('Promise 2 Resolved', data);
// }).catch(err =>{
//     console.log('Promise rejected', err);
// })


// * Fetch API
// fetch('todos.json').then(response =>{
//     console.log('Resolved', response);
//     return response.json();
// }).then(data =>{
//     console.log(data);
// }).catch(err =>{
//     console.log('Rejected', err);
// })


// * Async & await
const getTodos = async ()=> {
    const response = await fetch('todos.json');
    if(response.status != 200){
        throw new Error('Cannot fecth data!')
    }
    const data = await response.json();
    return data;
}
getTodos()
    .then(data => console.log('Resolved', data))
    .catch(err => console.log('Rejected', err.message));
