var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TallerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taller: { type: String },
    lat: { type: String },
    lon: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});



module.exports = mongoose.model('talleres', TallerSchema);
