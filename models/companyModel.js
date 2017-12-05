const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Company schema
const CompanySchema = mongoose.Schema({
    estateName: {
        type: String,
    },
    euid: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    subscribeCode: {
        type: String,
        require: true
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    uniqueId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    numberOfUnits: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    }
});

const Company = module.exports = mongoose.model('Company', CompanySchema)

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { 'username': username }
    User.findOne(query, callback);
}

module.exports.addCompany = function(newCompany, callback) {
    // gen salt
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newCompany.password, salt, (error, hash) => {
            if (error) throw error;
            newCompany.password = hash;
            newCompany.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}