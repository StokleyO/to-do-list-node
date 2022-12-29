// Create an HTTP Server using express library
const express = require('express'); //express here is a function
const app = express();

items = [];

//need to parse the data to use the body as a JSON
app.use(express.json());

//This is how you GET all the items on your to do list via the /items URL after :3001
app.get('/items', (req, res) => {
    res.send(items);
});

// This is how you ADD items to your to do list via the /item URL after :3001
app.post('/item', (req, res) => {
    items.push(req.body);
    res.send('this item has been added')
});

app.delete('/reset', (req, res) => {
    items = [];
    res.send('your to-do list has been reset')
});

//want to listen on Port 3000, and also have a callback that we can pass to the listen function to know whenever the application is ready and we can start using backend
app.listen(3001, () => {
    console.log('Application is ready to-go on port 3001');
});