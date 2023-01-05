// Create an HTTP Server using express library
const Joi = require('Joi');
const express = require('express');
const app = express();
var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }

const signupSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password')
});

const accounts = [];

const recipes = [
    {
        name: "powderCake",
        ingredients: "egg, cheese, flour"
    }
]

// add the express.json middleware to parse the request body
app.use(express.json());

app.get('/signup', (req, res) => {
    res.sendFile('./index.html', {root:__dirname})
})

app.post('/signup', (req, res) => {
    const data = req.body;

    const validation = signupSchema.validate(data);

    if (validation.error !== undefined) {
        res.status(400).send(validation.error);
        return;
    }

    accounts.push(data);
    res.send(accounts);
});


app.post('/signin', (req, res) => {
    const data = req.body;

    let userEmail = req.body.email;
    let userPassword = req.body.password;

    accounts.forEach((element) => {
        
        if (userEmail == element.email && userPassword == element.password) {
            console.log("You're logged in")
            
            app.set('trust proxy', 1) // trust first proxy
            sess.cookie.secure = true // serve secure cookies
            sess.email = userEmail;

            var hour = 3600000;
            sess.cookie.expires = new Date(Date.now() + hour);
            sess.cookie.maxAge = hour;

            console.log(sess);
            return
        }
        else {
            console.log("you're not logged in")
            console.log(sess);
            return
        }
    });
    res.send("Done.")
})

app.get('/recipe', (req, res) => {
    if (sess.cookie.secure == true ) {
        res.send(recipes);
    }
    else {
        res.send("You are not authenticated")
    }
})

app.listen(3002, () => {
    console.log('Application is ready on port 3002');
});