const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
  isComplete: { type:Boolean, default: false , required:true }, 
  isAttending: { type:Boolean, default: false , required:true }, 
  isWithKids: { type:Boolean, default: false , required:true },
  menuSelection: { type: String, enum: ['Carne','Pescado','Vegetariano','Vegano','Sin Gluten'], default: 'Carne', required:true },
  isIntolerant: { type:Boolean, default: false, required:true },
  intoleranceBox: { type:String, default: 'Gluten', required:true },
  isWithBus: { type:Boolean, default: false, required:true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Preferences = mongoose.model('Preferences', preferencesSchema);

module.exports = Preferences;


