var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var lpModel = new Schema({
  title: {type: String },
  artist: {type: String},
  genre: {type: String},
  own: {type: Boolean, default:false}
});

module.exports= mongoose.model('Lp',lpModel);
