const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// route to get all posts
// orders posts from newest to oldest
// includes user info and comments
router.get('/', async (req, res) => {
    Post.findAll({
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
                attributes: 'username'
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'date_created', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username'],
                }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for users to create new posts
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for users to update their posts
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then (dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'post not found'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// route for users to delete any of their posts
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;