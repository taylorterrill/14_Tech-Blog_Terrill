const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


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

router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session.user_id);
  const userPosts = await Post.findAll({ where: { user_id: req.session.user_id }});
  const posts = userPosts.map(post => post.get({ plain: true }))
  console.log(userPosts);
  res.render('dashboard', {posts})
});

// Exports router
module.exports = router;