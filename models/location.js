const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name : { type:String, required:true },
    description : { type:String, required:true },
    imgUrl: { type: String, default: ''}
} ,{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
