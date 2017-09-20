const express = require('express');
const knex = require('./knex.js');
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

function validAdmin(admin) {
  let validName = typeof admin.name === 'string' && admin.name.trim() !== '' && admin.name != null;
  let validEmail = typeof admin.email === 'string' && admin.email.match(/([@])/g) != null;
  let validPassword = typeof admin.password === 'string' && admin.password.trim() != '';
  return validName && validEmail && validPassword;
}

router.get('/admin', (req, res, next) => {
  knex('admin')
    .then(admins => {
      res.json(admins)
    })
})

router.post('/signup', (req, res, next) => {
  if (validAdmin(req.body)) {
    knex('admin').where('email', req.body.email)
      .then(admin => {
        if (admin.length === 0) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          req.body.password = hash
          knex('admin').insert(req.body).returning('*')
            .then(admin => {
              delete admin[0].password
              var token = jwt.sign(admin[0], process.env.TOKEN_SECRET);
              res.json({data: token})
            })
        } else {
          res.json({
            error: 'email already in use'
          });
        }
      })
  } else {
    res.json({
      error: 'Invalid inputs.'
    })
  }
});

router.post('/signin', function(req, res, next) {
  knex('admin').where('email', req.body.email)
    .then(admin => {
      if (admin.length === 0) {
        res.json({
          error: 'Email or password did not match'
        })
      } else {
        var match = bcrypt.compareSync(req.body.password, admin[0].password)
        if (match) {
          delete admin[0].password
          var token = jwt.sign(admin[0], process.env.TOKEN_SECRET);
          res.json({
            data: token
          })
        } else {
          res.json({
            error: 'Email or password did not match'
          })
        }
      }
    })
});

module.exports = router;
