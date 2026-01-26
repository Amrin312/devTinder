const express = require('express');
// require('../config/database');
const connectDB = require('../config/database');

const app = express();

app.post('/addUser', async (req, res)=>{
    try{
        const user = new User({
            firstName: 'Amrin',
            lastName: 'Fathima',
            age: 24,
            email: 'amrin@gmail.com'
        });

        await user.save();
        res.send('User Added!');
    }catch(err){
        res.send('Error adding user' , err.message);
    }
});

app.get('/', (req, res) => {
    res.send('Hello world!');
})

 app.listen(7777, () => {
 console.log(`Server is successfully running on 7777`);
 });


