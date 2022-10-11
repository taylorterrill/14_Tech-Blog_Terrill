const { Post } = require('../models');

const postData = [
    {
        title: 'What Loving Kindness Can Teach Us About Version Control',
        content: 'Git Hub is a powerful platform for creating software as a team. However, the practice of loving kindess is crutial to maintaining team morale.',
        user_id: 1,
    },
    {
        title: 'The Art of MVC',
        content: 'Know your routes as well as you know your models.',
        user_id: 2,
    },
    {
        title: 'Why I Only Code in the Woods',
        content: 'My legs get sore when I sit at a desk all day. I would rather sit in the dirt with my laptop',
        user_id: 3,
    },
    {
        title: 'Software from Another Dimension',
        content: 'Call it what you want, a ball of energy, god; whatever it was, it gave me the best idea for an app.',
        user_id: 4,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;