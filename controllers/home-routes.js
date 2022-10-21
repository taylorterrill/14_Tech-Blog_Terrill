const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'date_created',
      ],
      order: [['date_created', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
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
  const userPosts = await Post.findAll({ where: { user_id: req.session.user_id } });
  const posts = userPosts.map(post => post.get({ plain: true }))

  res.render('dashboard', {
    posts,
    logged_in: req.session.logged_in
  })
});

router.get('/post/:id', withAuth, async (req, res) => {
  const onePost = await Post.findOne(
    {
      where: { id: req.params.id },
      // order: [['date_created', 'DESC']],
      // include: [
      //   {
      //     model: User,
      //     attributes: 'username'
      //   },
      //   {
      //     model: Comment,
      //     attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
      //     include: {
      //       model: User,
      //       attributes: ['username'],
      //     }
      //   }
      // ]
    });
  const post = onePost.get({ plain: true })
  res.render('post', {
    post,
    logged_in: req.session.logged_in
  })
});

module.exports = router;