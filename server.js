// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); 
const app = express();
const backend = require('./backend/backend');

app.use(cors());

app.use(bodyParser.json());

// Use the routes defined in backend.js
app.use('/', backend);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});