const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// reference: https://github.com/fent/node-ytdl-core
// reference: https://github.com/TimeForANinja/node-ytpl

// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// app.get('/solomp3', (req, res)=> {
//   res.sendFile('client/soloMP3.html', {root: __dirname })
// });
// app.get('/listmp3', (req, res)=> {
//   res.sendFile('client/listmp3.html', {root: __dirname })
// });
app.get('/', (req, res)=> {
  res.sendFile('client/soloMP3.html', {root: __dirname })
});
app.get('/solomp3', (req, res)=> {
  res.sendFile('client/soloMP3.html', {root: __dirname })
});

app.post('/solomp3/download', (req, res)=>{
  let link = req.body.link
  let stream = ytdl(link, {filter: 'audioonly'})
  stream
    .on('error', (e)=>{
      res.json({error: 'invalid link!'})
    })
    .on('info', (info) => {
      let vidName = info.videoDetails.title.replace(/[\/\\":*?<>|]/g, '_');
      stream.pipe(fs.createWriteStream(`./resource/${vidName}.mp3`))
      .on('finish', ()=>{
        res.json({error: 'no error', vidName: vidName})
      })
    });
});
app.get('/solomp3/download/:vidName', (req, res)=>{
  console.log('get path: ',req.params.vidName)
  res.download(`./resource/${req.params.vidName}.mp3`)
})
app.post('/solomp3/remove', (req, res)=>{
  let remove = req.body.remove
  let path = `./resource/${remove}.mp3`
  setTimeout(() => {
    try{
      fs.unlinkSync(path)
    } catch (e){
      console.log(e);
    }
  }, 10000);
})



// app.post('/listmp3/download', (req, res)=>{
//   let link = req.body.link
//   let id = link.split('list=')[1]
  
//   let linklist = []
//   const main = async() => {
//     const playlist = await ytpl(id, {limit:Infinity});
//     for (let i=0; i<playlist.items.length; i++){
//       linklist.push(playlist.items[i].shortUrl)
//     }
//     for (let i=147; i<188; i++){
//       console.log('handling ',linklist[i])
//       let stream = ytdl(linklist[i], {filter: 'audioonly'})
//       stream
//         .on('error', (e)=>{
//           res.json({error: `invalid link! for ${linklist[i]}`})
//         })
//         .on('info', (info) => {
//           let vidName = info.videoDetails.title.replace(/[\/\\":*?<>|]/g, '_');
//           stream.pipe(fs.createWriteStream(`./downloadList/${vidName}.mp3`))
//         });
//     }

//   }
//   main();
// });

// const main = async() => {
//   const playlist = await ytpl('UU_aEa8K-EOJ3D6gOs7HcyNg', {limit:Infinity});
//   let linklist = []
//   for (let i=0; i<playlist.items.length; i++){
//     linklist.push(playlist.items[i].shortUrl)
//   }

//   if (linklist.length > 1){
//     console.log(linklist)
//   }
// }
// main();

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})