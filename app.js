// Create an HTTP Server using express library
const express = require('express'); //express here is a function
const app = express();

const articles = [];

//need to parse the data to use the body as a JSON
app.use(express.json());
//get method expects two parameters, the first parameter is the path for the input where we want to listen for the request. The second parameter is the callback function for the request
app.get('/articles', (req, res) => {
    res.send('the articles');
});
//app dot, then the method we want to use. When we post an article, we expect the client to send a body. The body can be a lot of things. We can send a JSON body or an XML body or Text body. Even a form body, or form encoded body. Lots of options.
app.post('/article', (req, res) => {
    articles.push(req.body);
    res.send('article posted')
});

//want to listen on Port 3000, and also have a callback that we can pass to the listen function to know whenever the application is ready and we can start using backend
app.listen(3000, () => {
    console.log('Application is ready on port 3000');
});