const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const fileType = require("file-type")



cmd({
    pattern: "zoom",	
    react: '🔎',
    category: "movie",
    desc: "subtitle downloder",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')
// Fetch api
let url = await fetchJson(`https://zoom-search.vercel.app/?q=${q}`)

  if (url.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  
  url.data.map((v) => {
	rows.push({
        buttonId: prefix + `zoomdl ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })


const msg = `*ZOOM SEARCH*`
  
const buttonMessage = {
 
image: {url: config.ALIVE_IMG},	// your img url or config.LOGO
  caption: msg,
  footer: config.FOOTER, // your footer or config.FOOTER
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: 'ERRO API NOT WORKING' }, { quoted: mek } )
}
})


cmd({
    pattern: "zoomdl",	
    react: '🎞️',
    category: "movie",
    desc: "subtitle downloder",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')
// Fetch api
let urll = await fetchJson(`https://zoom-dl.vercel.app/?q=${q}`)

                      const msg = `*ZOOM SUBDL DOWNLOADER*\n\n
Title: ${urll.data.title}\n
Author: ${urll.data.author}\n
Link: ${q}\n
Date: ${urll.data.date}\n
Size: ${urll.data.size}\n
Views: ${urll.data.view}\n`


 const buttons = [
        {buttonId:`${prefix}dlz ${urll.data.downloadLink}±${title}` , buttonText: {displayText: 'DOWNLOAD'}, type: 1}
        
      ]
        const buttonMessage = {
		image: {url: config.LOGO },	
            caption: msg,
            footer: config.FOOTER,
            buttons: buttons,
            headerType: 1
        }
       await conn.buttonMessage(from, buttonMessage, mek)
       } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    })



  cmd({
    pattern: "dlz",
    react: "📥",
    category: "search",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
    const data = q.split("±")[0]
        const datas = q.split("±")[1]
       

        const mediaUrl = data.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `${datas}
     
   `,
            mimetype: "application/rar",
            fileName: `${datas}.rar`,
        };

        await conn.sendMessage(from, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});
