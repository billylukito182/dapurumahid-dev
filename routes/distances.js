const express = require('express');
const distance = require('google-distance');
const keys = require('../config/keys');
const router = express.Router();


router.get('/', function(req, res, next) {
    console.log("google distance")
    distance.apiKey = keys.googleKey;
    distance.get(
        {
            origin: 'APL Tower',
            destination: 'Summarecon Mall Serpong'
        },
        function(err, data) {
            let response = '';
            if (err){
                console.log(err);
                response = err;
            } else{
                console.log('distance = ',data);
                response = data;
            }
            res.render('distances', { title: response });
        });
});
module.exports = router;