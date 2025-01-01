const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "yrJC3D4C#AppqKGu6Blij1F-AYTHiqQF2vdEeCJi6V63GV26dt-c",
MONGODB: process.env.MONGODB || "mongodb://mongo:zVaTZTYXwMZzdGDKYLJzjtBPHJASnnyW@junction.proxy.rlwy.net:38558"
};
