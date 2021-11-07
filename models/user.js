const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type:String, required:true}, 
  password: { type:String, required:true },
  email: { type:String, required:true}, 
  phone: { type:String },
  role: {type: String, enum: ['admin','user','guest'], default: 'user'},
  accepted: { type:String, enum: ['waiting','yes','no'], default: 'waiting'},
  guests: [{type: Schema.Types.ObjectId, ref: 'Guest'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;


