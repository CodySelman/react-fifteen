const path = require('path');
const express = require('express');
const axios = require('axios');

require('dotenv').config();
const{PIXABAY_API_KEY}=process.env;

const serverApp = express();
const port = process.env.PORT || 5000;

//middleware
serverApp.use(express.static('client/build'));

serverApp.get('/images/:searchTerm', function(request, response){
    const { searchTerm } = request.params;
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&safesearch=true&q=${searchTerm}`;
    axios.get(url)
        .then(res => {
            response.status(200).json(res.data)
        })
        .catch(err => {
            response.status(500).json({
                msg: 'Image data failed to load.'
            })
        });
});

//this serves the finished react app
serverApp.get('*', (request, response) => {
    response.sendFile('index.html', {root: path.resolve('client/build')});
});

serverApp.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});