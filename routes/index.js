const { Router } = require('express');
const router = Router();
//const verifyToken = require('../middlewares/authenticate');

 router.use(require('./UserRoutes'));

module.exports = router;
