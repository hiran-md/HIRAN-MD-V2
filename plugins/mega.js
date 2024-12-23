

const axios = require('axios');
const { File } = require('megajs');
const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "mega",
    react: "🍟",
    alias: ["megadl","meganz"],
    desc: "urlneed",
    category: "download",
    use: '.mega url',
    filename: __filename
}, 
    async (conn, mek, m, { from, q, reply }) => {
    if (!q) {
        return await reply('*Please provide a mega.nz URL!*');
    }

    try {
        const file = File.fromURL(q)
        await file.loadAttributes()
        //if (file.size >= 2048 * 1024 * 1024) return reply(`File size exeeded...\nMaximum Upload Size Is ${config.MAX_SIZ} MB`)
        const data = await file.downloadBuffer();
        
        if (/mp4/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "video/mp4", filename: `${file.name}` }, { quoted: mek });
        } else if (/pdf/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/pdf", filename: `${file.name}` }, { quoted: mek });
        } else if (/zip/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/zip", filename: `${file.name}` }, { quoted: mek });
        } else if (/rar/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-rar-compressed", filename: `${file.name}` }, { quoted: mek });
        } else if (/7z/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-7z-compressed", filename: `${file.name}` }, { quoted: mek });
        } else if (/jpg|jpeg/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/jpeg", filename: `${file.name}` }, { quoted: mek });
        } else if (/png/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/png", filename: `${file.name}` }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { document: data, mimetype: "application/octet-stream", filename: `${file.name}` }, { quoted: mek })
        }
        
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});
