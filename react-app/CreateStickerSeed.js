const openmoji = require('openmoji')
const fs = require('fs')

const om = openmoji.openmojis;
let py = '';
for(let emoji of om) {
  let name = emoji.annotation;
  let path = `${emoji.hexcode}.svg`

  py += `
    sticker = Sticker(name='${name}', path='${path}')
    db.session.add(sticker)
  `
}

py += `db.session.commit()`;

const cb = err => {
  if (err) {
     return console.error(err);
  }
  console.log("Data written successfully!");
  console.log("Let's read newly written data");
}

fs.writeFile('sticker-seed.txt', py, cb)
