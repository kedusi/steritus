const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const SterilizerSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly name your sterilizer as it is labeled on the facade.'
    },
    status: {
        type: String,
        enum: ['available', 'in cycle', 'out of service'],
        default: 'available'
    },
    message: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Sterilizers', SterilizerSchema)