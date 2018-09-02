import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const { Schema } = mongoose

const adminUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

adminUserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

const AdminUser = mongoose.model('AdminUser', adminUserSchema)

export default AdminUser
