/* eslint no-console: 0 */

import express from 'express'

import passport from '../../server/passport'

const router = express.Router()

router.get('/', passport.isAuthed(), (req, res) => res.render('index', { title: 'Admin - home' }))

router.get('/login', passport.isNotAuthed(), (req, res) => res.render('login', { title: 'Admin - login' }))

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/admin/login',
  successRedirect: '/admin',
}))

router.get('/logout', passport.isAuthed(), (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err)
      }

      return res.redirect('/admin/login')
    })
  }
})

export default router
