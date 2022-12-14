const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{

    // * lodash
    const num = _.random(0, 30);
    console.log(num);

    const greet = _.once(()=>{
        console.log('Helllo');
    });
    greet();
    greet();

    // * Set header content type
    res.setHeader('content-type', 'text/html');
    
    // * Routing system
    let path = './views/'
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // * Send HTML file
    fs.readFile(path,(err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            // res.write(data);
            res.end(data);
        }
    })

});

server.listen(3000, 'localhost', ()=>{
    console.log('Listening on port 3000');
});