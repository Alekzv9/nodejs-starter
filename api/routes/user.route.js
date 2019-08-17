const express = require('express');
const router = express.Router();
const Response = require('../models/response');
const UserService = require('../services/user.service');
const checkAuth = require('../middleware/check-auth');

/**
 * Create user.
 */
router.post('/signup', (req, res) => {
  const params = req.body;
  UserService.createUser(params.username, params.password)
    .then(result => res.json(new Response(true, 'User created.', result)))
    .catch(err =>
      res.status(400).json(new Response(false, 'User creation failed.', err))
    );
});

router.post('/login', (req, res) => {
  const params = req.body;
  UserService.loginUser(params.username, params.password)
    .then(result => res.json(new Response(true, 'User logged in.', result)))
    .catch(err => {
      res.status(400).json(new Response(false, 'User/password invalid', err));
    });
});

router.post('/refreshToken', (req, res) => {
  UserService.refreshToken(req.body.refreshToken)
    .then(result => res.json(new Response(true, 'Token updated.', result)))
    .catch(err => res.status(401).json(false, 'refresh-token-failed', err));
});

router.post('/logout', checkAuth, (req, res) => {
  UserService.logout(req.userData.userId)
    .then(result => res.json(new Response(true, 'User logged out.', result)))
    .catch(err =>
      res.status(400).json(new Response(false, 'User logging out failed.', err))
    );
});

module.exports = router;
