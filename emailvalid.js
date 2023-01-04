// Create an HTTP Server using express library
const Joi = require('Joi');
const express = require('express');
const app = express();

const contactSchema = Joi.object({
    title: Joi.string().min(20).max(100).required(),
    email: Joi.string().email(),
    message: Joi.string().min(30).required()
})

const contacts = [];

// add the express.json middleware to parse the request body
app.use(express.json());

app.post('/contact', (req, res) => {
    const data = req.body;

    const validation = contactSchema.validate(data);

    if (validation.error !== undefined) {
        res.status(400).send(validation.error);
        return;
    }

    contacts.push(data);
    res.send(contacts);
});

app.listen(3000, () => {
    console.log('Application is ready on port 3000');
});