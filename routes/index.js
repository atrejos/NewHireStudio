'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
const Newhire = require('../models/Newhires');


//ROUTES


/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('views/home.html', { root: __dirname });
});

/* GET newhire registration page. */
router.get('/registration', function (req, res) {
    res.sendFile('views/registration.html', { root: __dirname });
});

/* GET status page. */
router.get('/status', function (req, res) {
    res.sendFile('views/status.html', { root: __dirname });
});

/* submit newhire form page */
router.get('/form', function (req, res) {
    res.sendFile('views/form.html', { root: __dirname });
});

//MIDDLEWARE
router.use('/form', () => {
    //res.send('something else is running');
    console.log('routes 2')
});

          // NEWHIRE ROUTES

//posts new newhire
router.post('/', async (req, res) => {
    const newhire = new Newhire({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        uin: req.body.uin,
        DOH: req.body.DOH,
        Pin: req.body.Pin,
        StatusCode: req.body.StatusCode
    });
    try {
        const savedNewhire = await newhire.save();
        res.json(savedNewhire);
    } catch (err) {
        res.json({ message: err });
    }
});

//find newhire by Id
router.get('/:Id', async (req, res) => {
    try {
        const newhire = await Newhire.findById(req.params.Id);
        res.json(newhire);
    } catch (err) {
        res.json({ message: err });
    }
});

//find newhire by uin ~ not working
router.get('/:uin', async (req, res) => {
    try {
        const foundByUin = await Newhire.findOne({ uin: req.params.uin });
        res.json(foundByUin);
    } catch (err) {
        res.json({ message: err });
    }
});

//gets all newhires
router.get('/data', async (req, res) => {
    try {
        const newhires = await Newhire.find();
        res.json(newhires);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete newhire by UIN
router.delete('/:Uin', async (req, res) => {
    try{
        const removedPost = await Newhire.remove({ uin: req.params.Uin })
        res.json(removedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

//Update newhire ~ not working
router.delete('/:Uin', async (req, res) => {
    try {
        const updatedNewhire = await Newhire.updateOne(
            { uin: req.params.Uin },
            { $set: { firstName: req.body.firstName } }
        );
        res.json(updatedNewhire);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
