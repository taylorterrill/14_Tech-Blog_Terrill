const router = require('express').Router();
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Takes user to login page
router.get('/login', async (req, res) => {
  res.render('login')
});

// Takes user to signup page
router.get('/signup', async (req, res) => {
  res.render('signup')
});


// Exports router
module.exports = router;