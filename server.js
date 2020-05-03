// Setup empty JS object to act as endpoint for all routes
projectData = {
    posts:[]
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const listening = () => { console.log(`Using localhost: ${port}`) };
const server = app.listen(port, listening);


app.get('/posts',(req, res) => {
    res.send(projectData.posts)
})

app.post('/entry',(req,res) => {
    projectData.posts.push(req.body)
    res.send({"status":"posted",projectData})
})



