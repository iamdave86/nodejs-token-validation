/* eslint no-console: 0 */

import express from 'express'
import bcrypt from 'bcrypt'

import AdminUser from '../../schema/adminUser'

const router = express.Router()

router.get('/', (req, res) => res.render('index', { title: 'NodeJS Token Auth' }))

router.get('/createuser/:username/:password', (req, res) => {
  const username = req.params.username || ''
  const password = req.params.password || ''

  const passwordHash = bcrypt.hashSync(password, 10)

  AdminUser.findOne({ username }, (err, dbUser) => {
    if (dbUser) {
      res.send('username already exists')
    } else {
      new AdminUser({ username, password: passwordHash }).save((createErr) => {
        if (createErr) {
          console.log(createErr)
          res.send('error, please try again later')
        }

        return res.send(`user creation successful with the following credentials:
          <br/>
          username: <strong>${username}</strong>
          <br/>
          password: <strong>${password}</strong>
        `)
      })
    }
  })
})

export default router
