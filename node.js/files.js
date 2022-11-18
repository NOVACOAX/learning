const fs = require('fs');

// * Reading files

// fs.readFile('./docs/blog1.txt', (err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// * Write files

// fs.writeFile('./docs/blog1.txt', 'Hello World!', ()=>{
//     console.log('File written');
// })
// fs.writeFile('./docs/blog2.txt', 'Hello World!', ()=>{
//     console.log('File written');
// })

// * Directories

// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('Folder created');
//     })
// }else{
//     fs.rmdir('./assets', (err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('Folder deleted');
//     })
// }

// * delete files

// if(fs.existsSync('./docs/blog2.txt')){
//     fs.unlink('./docs/blog2.txt', (err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('File deleted');
//     })
// }