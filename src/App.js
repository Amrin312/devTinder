const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Server is working... 🚀');
});



app.listen(7777, () => {
    console.log('server listening'); 
});