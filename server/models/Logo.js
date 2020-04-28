var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
            //id,text,text-color,fontsize,backgroundcolor,bordercolor,
            // borderradius, borderwidth, padding, margin
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144 },
  borderWidth: { type: Number, min: 2, max: 144 },
  padding: { type: Number, min: 2, max: 144 },
  margin: { type: Number, min: 2, max: 144 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);