const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// for any route that does not exist
router.use((req, res) => {
    res.status(404).end();
});

// Exports router
module.exports = router;