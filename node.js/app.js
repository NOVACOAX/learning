const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// novacoaxU79MdqMqkiRSvV4

// * Express app
const app = express();

// * Connect to mongo db
const dbURI ='mongodb+srv://novacoax:U79MdqMqkiRSvV4@nodetuts-magpie.gv7nzt3.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result)=>{
        // * Listen for request
        app.listen(3500);
    })
    .catch((err)=>{console.log('error')});

    
// * Register view engine
app.set('view engine', 'ejs');
// * folder
app.set('views', 'myviews');


// app.get('/', (req, res)=>{
//     res.sendFile('./views/index.html', {root: __dirname});
// });
// app.get('/about', (req, res)=>{
//     res.sendFile('./views/about.html', {root: __dirname});
// });

// // * Redirects
// app.get('/about-us', (req, res)=>{
//     res.redirect('/about');
// });

// // * 404 page
// app.use((req, res)=>{
//     res.status(404).sendFile('./views/404.html', {root: __dirname});
// })

// // * Middleware
// app.use((req, res, next)=>{
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });


// * Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

// // * mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res)=>{
//     const blog = new Blog({
//         title: 'New blog2',
//         snippet: 'About my new blog2',
//         body: 'Some more random text here2'
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });
// app.get('/all-blogs', (req, res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });
// app.get('/single-blog', (req, res)=>{
//     Blog.findById('63768cd2c7eceedddd77a83b')
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });


app.get('/', (req, res)=>{
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', {title: 'home', blogs});
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'about'});
});

app.use('/blogs', blogRoutes);

// * 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})