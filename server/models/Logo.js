var mongoose = require('mongoose');

var textSchema = new mongoose.Schema({
  // content color fontsize position
  content: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  position: [Number]
});

var imgSchema = new mongoose.Schema({
  // link position
  link: String,
  position: [Number],
  scale: { type: Number, min: 1, max: 100 }
});

var LogoSchema = new mongoose.Schema({
  // id name email text[] imgs[] backgroundcolor bordercolor
  // dimentions borderradius borderwidth padding margin lastupdate
  id: String,
  email: String,
  name: String,
  text: [textSchema],
  imgs: [imgSchema],
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144 },
  borderWidth: { type: Number, min: 2, max: 144 },
  padding: { type: Number, min: 2, max: 144 },
  margin: { type: Number, min: 2, max: 144 },
  dimensions: [Number],
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = {
  LogoModel: mongoose.model('Logo', LogoSchema),
  imgModel: mongoose.model('Img', imgSchema),
  textModel: mongoose.model('Text', textSchema)
};