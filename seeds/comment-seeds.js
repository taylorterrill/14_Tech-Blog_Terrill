const { Comment } = require('../models');

const commentData = [
    {
        content: 'Overrated, but I will think about it',
        user_id: 2,
        post_id: 1,
    },
    {
        content: 'Good interpretation, but where does that leave views?',
        user_id: 1,
        post_id: 2,
    },
    {
        content: 'I am floating after reading this',
        user_id: 3,
        post_id: 4,
    },
    {
        content: 'That is exactly why I live in the mountains',
        user_id: 4,
        post_id: 3,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;