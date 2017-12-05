const express = require('express');
const company_router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Company = require('../models/companyModel');

company_router.post('/register', (req, res, next) => {

    let newCompany = new Company({
        estateName: req.body.estateName,
        euid: req.body.euid,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        telephone: req.body.telephone,
        username: req.body.username,
        password: req.body.password,
        numberOfUnits: req.body.numberOfUnits,
        subscribeCode: '',
        startDate: '',
        endDate: '',
        status: 'inactive'
    });


    Company.addCompany(newCompany, (err, company) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register company' });
        } else {
            res.json({ success: true, msg: 'company registered' });
        }
    });

});

company_router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const euid = req.body.euid;

    Company.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'user not found' });
        }

        Company.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' })
            }
        })
    })
});

company_router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ company: req.company });
});

module.exports = company_router;
