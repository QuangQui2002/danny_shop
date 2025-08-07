const express = require('express');
const router = express.Router();
const responseMiddleware = require('../middlewares/response.middleware');
const adminController = require('../controllers/admin.controller');
router.use(responseMiddleware);

router.get('/create-admin',adminController.addAdmin);

router.get("/", (req, res) => {
    console.log(123);
});









module.exports = router;