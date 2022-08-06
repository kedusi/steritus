const mongoose = require('mongoose'),
    Sterilizer = mongoose.model('Sterilizers')

exports.list_all_sterilizers = (req, res) => {
    Sterilizer.find({}, (err, sterilizers) => {
        if(err) res.send(err)
        res.json(sterilizers)
    })
}

exports.create_a_sterilizer = (req, res) => {
    const new_sterilizer = new Sterilizer(req.body)
    new_sterilizer.save((err, sterilizer) => {
        if(err) res.send(err)
        res.json(sterilizer)
    })
}

exports.read_a_sterilizer = (req, res) => {
    Sterilizer.findById(req.params.sterilizerId, (err, sterilizer) => {
        if(err) res.send(err)
        res.json(sterilizer)
    })
}

exports.update_a_sterilizer = (req, res) => {
    Sterilizer.findOneAndUpdate(
        {_id: req.params.sterilizerId},
        req.body,
        {new: true},
        (err, sterilizer) => {
            if(err) res.send(err)
            res.json(sterilizer)
    })
}

exports.delete_a_sterilizer = (req, res) => {
    let sterilizerName
    Sterilizer.findById(req.params.sterilizerId, (err, sterilizer) => {
        if(err) res.send(err)
        sterilizerName = sterilizer.name
    })
    Sterilizer.deleteOne({
        _id: req.params.sterilizerId
    }, err => {
        if(err) res.send(err)
        res.json({message: `${sterilizerName} has been deleted`})
    })
}