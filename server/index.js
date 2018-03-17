const express = require('express');
const axios = require('axios');

require('dotenv').config();
const{API_KEY}=process.env;
console.log(API_KEY);

const serverApp = express();
const port = process.env.PORT || 5000;

serverApp.get('picture/', function(request, response){
    const url = 'url here';
    axios.get(url)
        .then(res => {
            response.json({
                response.json(res.data);
            })
        })
        .catch(err => {
            response.json({
                msg: 'Axios get broken'
            })
        });
})

serverApp.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});