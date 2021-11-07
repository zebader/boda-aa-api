const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    name: { type:String, default: false , required:true }, 
    menu: { type: String, enum: ['animal','vegetariano','vegano'], default: 'animal', required:true },
    bus: { type: String, enum: ['alcazar','ninguno'], default: 'ninguno', required:true },
    intolerance: { type:String, default: '', required:false },
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;


