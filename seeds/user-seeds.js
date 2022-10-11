const { User } = require('../models');

const userData = [
    {
        username: 'Taylor',
        email: 'taylor.terrill@gmail.com',
        password: 'password123'
    },
    {
        username: 'Pela',
        email: 'pela.freeman@gmail.com',
        password: 'password456'
    },
    {
        username: 'Kianna',
        email: 'kianna.dragoon@gmail.com',
        password: 'password789'
    },
    {
        username: 'Laurie',
        email: 'laurie.seron@gmail.com',
        password: 'password1011'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;