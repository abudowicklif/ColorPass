const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(require('./functions/registerUser'));
app.use(express.json());
app.use(cors());

// Import API routes
app.use(require('./functions/registerUser'));
app.use(require('./functions/loginUser'));
app.use(require('./functions/generateGrid'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
