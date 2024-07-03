const mongoose = require('mongoose');

const faceItSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true
    },
    badge: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

faceItSchema.index({ username: -1 });

const Product = mongoose.model('face_it', faceItSchema);

module.exports = Product;