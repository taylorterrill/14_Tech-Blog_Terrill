const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for users to post comments
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.body.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            });
    }
});

// route for users to update their comments
router.put('/:id', withAuth, (req, res) => {
    Comment.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then (dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'comment not found'});
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// route for users to delete comments
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'comment not found' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;