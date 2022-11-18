const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writestream = fs.createWriteStream('./docs/blog4.txt');

// * Read chunks
// readStream.on('data', (chunk)=>{
//     console.log('----- NEW CHUNK ----');
//     console.log(chunk);
//     writestream.write('\nNEW CHUNK\n');
//     writestream.write(chunk);
// });

// * Piping 
readStream.pipe(writestream);