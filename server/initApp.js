/* eslint no-console: 0 */

import path from 'path'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'

import tokenRoutes from './tokenRoutes'
import passport from './passport'

require('dotenv').config()

const getSessionConfig = (name, app) => {
  const { SESSION_SECRET: secret } = process.env || ''
  const sessionConfig = {
    name: `${name}.connect.sid`,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: { },
  }

  if (app.get('env') === 'production') {
    sessionConfig.cookie.secure = true
  }

  return sessionConfig
}

const initApp = (name, app, viewsPath, routes) => {
  app.set('views', viewsPath)
  app.set('view engine', 'pug')
  app.use(session(getSessionConfig(name, app)))
  app.use('/static', express.static(path.join(__dirname, '..', 'static')))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/tokens', tokenRoutes)
  app.use('/', routes)

  if (app.get('env') === 'development') {
    app.use(logger('dev'))

    app.use((req, res, next) => {
      const err = new Error('File Not Found')
      err.status = 404

      return next(err)
    })

    app.use((err, req, res) => {
      res.status(err.status || 500)
      res.render('error', {
        title: 'Error',
        message: err.message,
        error: err,
      })
    })
  }

  app.use((req, res) => {
    res.status(400)
    res.render('notFound', { title: '404 Not Found' })
  })

  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      title: 'Error',
      message: err.message,
      error: {},
    })
  })
}

export const initDb = (app) => {
  const { MONGO_DB_PATH } = process.env || ''

  if (MONGO_DB_PATH) {
    mongoose.connect(MONGO_DB_PATH, { useNewUrlParser: true })

    if (app.get('env') === 'development') {
      mongoose.set('debug', true)
    }

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('DB connection successful')
    })
  }
}

export default initApp
