const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
    id : { type:String, required:true },
    email : { type:String, required:true },
} ,{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);

module.exports = ResetPassword;
