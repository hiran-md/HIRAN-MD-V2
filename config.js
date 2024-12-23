const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "VJgx1B7Y#ofODRyiUl9lnMYrAOjZ14eaBTkRl7htjbf7dvou6hm0",
MONGODB: process.env.MONGODB || "mongodb://mongo:GXnDtfReMrrkAsGLikUiQeiqQueUHpcL@autorack.proxy.rlwy.net:40505"
};
