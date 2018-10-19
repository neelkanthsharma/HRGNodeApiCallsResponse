const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/reset/:email', reset);
router.post('/forget/:email', forget);

module.exports = router;
function authenticate(req, res, next) {
    userService.authenticate(req)
        .then(user => user ? res.json({message: "Login SucessFull", user}) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
function register(req, res, next) {
    userService.create(req)
        .then(() => res.json({"message": "Sucessfully Registered"}))
        .catch(err => next(err));
}
function reset(req, res, next) {
    userService.reset(req)
        .then(() => res.json({"message": "Password Changed Sucessfully"}))
        .catch(err => next(err));
}
function forget(req, res, next) {
    userService.forget(req, res).then().catch(err => next(err))
}