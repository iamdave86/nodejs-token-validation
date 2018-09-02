import express from 'express'

import passport from './passport'
import Token from '../schema/token'

const router = express.Router()

router.route('/:token')
  .get((req, res) => {
    const hash = req.params.token || ''

    Token.findOne({ hash }, (err, dbToken) => {
      if (err) {
        res.status(500).send('error, please try again later')
      }

      if (!dbToken) {
        return res.status(404).send('wrong token')
      }

      if (!dbToken.isTokenAlive()) {
        return res.status(401).send('token has expired')
      }

      return res.send('token validation successful')
    })
  })
  .delete(passport.isAuthed(), (req, res) => {
    const hash = req.params.token || ''

    Token.deleteOne({ hash }, (deleteErr) => {
      if (deleteErr) {
        return res.status(500).send({ error: 'error, please try again later' })
      }

      return res.send('')
    })
  })

router.route('/')
  .get(passport.isAuthed(), (req, res) => {
    const title = 'Admin - token list'

    Token.find((err, tokens) => res.render('tokens', { title, tokens }))
  })
  .post(passport.isAuthed(), (req, res) => {
    new Token().save((err, token) => {
      if (err) {
        return res.status(500).send('error, please try again later')
      }

      if (!token) {
        return res.status(500).send('something happened, please try again later')
      }

      return res.send(token.hash)
    })
  })

export default router
