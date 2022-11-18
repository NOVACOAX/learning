const express = require('express');

const blog_controller = require('../controllers/blogController');

// * Express router
const router = express.Router();


// * Blog routes

router.get('/create', blog_controller.blog_create_get);

router.get('/', blog_controller.blog_index);

router.get('/:id', blog_controller.blog_details);

router.delete('/:id', blog_controller.blog_delete);
router.post('/', blog_controller.blog_create_post)
module.exports = router;
