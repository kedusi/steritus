const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const SterilizerSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly name your sterilizer as it is labeled on the facade.'
    },
    status: {
        type: [{
            type: String,
            enum: ['available', 'in cycle', 'out of service']
        }],
        default: 'available'
    }
})

module.exports = mongoose.model('Sterilizers', SterilizerSchema)