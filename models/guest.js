const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  name: { type:String, default: false , required:true }, 
  menu: { type: String, enum: ['carne','pescado','vegetariano','vegano'], default: 'carne', required:true },
  bus: { type: String, enum: ['manoteras','alcazar','ninguno'], default: 'ninguno', required:true },
  intolerance: { type:String, default: '', required:false }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;


