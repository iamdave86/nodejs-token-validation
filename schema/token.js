import mongoose from 'mongoose'
import randToken from 'rand-token'

require('dotenv').config()

const { Schema } = mongoose
const TOKEN_EXPIRY_DAY = +process.env.TOKEN_EXPIRY_DAY || 7

const generateRandomToken = function generateRandomToken() {
  const minLength = +process.env.RAND_TOKEN_LENGTH_RANGE_MIN || 6
  const maxLength = +process.env.RAND_TOKEN_LENGTH_RANGE_MAX || 12
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
  const hash = randToken.generate(length)

  this.hash = hash
}

const tokenSchema = new Schema({
  hash: {
    type: String,
    required: true,
    index: true,
    unique: true,
    default: generateRandomToken,
  },
  expiry_at: { type: Date, default: +new Date() + TOKEN_EXPIRY_DAY * 24 * 60 * 60 * 1000 },
  created_at: { type: Date, default: Date.now },
})

tokenSchema.methods.isTokenAlive = function isTokenAlive() {
  return this.expiry_at > new Date()
}

const Token = mongoose.model('Token', tokenSchema)

export default Token
