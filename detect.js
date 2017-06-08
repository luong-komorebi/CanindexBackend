const fs = require('fs')
const exec = require('child_process').exec;
const extractWiki = require('./extractWiki')

exports.detectImg = (filename, res) => {
  exec(`docker start d1e9db568fb6 && docker exec d1e9db568fb6 python /star_wars/labeling.py /star_wars/${filename}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stdout)
    let no1_name = stdout.split('\n')[1].split('-')[0]
    extractWiki.getWikiInfo(no1_name, res)
    fs.unlink(`./uploads/${filename}`, (err) => {
      if (err)
        console.log(err)
    })
   
  });
}
