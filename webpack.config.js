const path = require('path');

module.exports = {
    entry: './script.js', // Your main JavaScript file
    output: {
        filename: 'bundle.js', // The output file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // Set to 'production' for optimized builds
};
