const express = require('express');
const axios = require('axios');

require('dotenv').config();
const{PIXABAY_API_KEY}=process.env;

const serverApp = express();
const port = process.env.PORT || 5000;

serverApp.get('/images', function(request, response){
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&editors_choice=true%safesearch=true`;
    axios.get(url)
        .then(res => {
            response.status(200).json(res.data)
        })
        .catch(err => {
            response.status(500).json({
                msg: 'Image data failed to load.'
            })
        });
})

serverApp.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});