/* eslint no-console: 0 */

import passport from 'passport'

import AdminUser from '../schema/adminUser'

const LocalStrategy = require('passport-local').Strategy

passport.use(
  new LocalStrategy((username, password, done) => {
    AdminUser.findOne({ username }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }

      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }

      return done(null, user)
    })
  }),
)

passport.isAuthed = () => (req, res, next) => {
  if (!req.user) {
    return res.redirect('/admin/login')
  }

  return next()
}

passport.isNotAuthed = () => (req, res, next) => {
  if (req.user) {
    res.redirect('/admin')
  }

  return next()
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  AdminUser.findById(id, (err, user) => {
    done(err, user)
  })
})

export default passport
