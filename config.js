const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "auR1GK6Y#aIu4Z15TstkMb3wj-XM4Nc00oqsflXcSbzAXkDdmOkI",
MONGODB: process.env.MONGODB | "mongodb+srv://knight_rider:GODGURU12345@knight.jm59gu9.mongodb.net/?retryWrites=true&w=majority"
};
