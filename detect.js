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
    // let no2_name = stdout.split('\n')[2].split('-')[0]
    // let no1_point = parseFloat(stdout.split('\n')[1].split('-')[1])
    // let no2_point = parseFloat(stdout.split('\n')[2].split('-')[1])

    
    // result['Name'] = no1_name
    // result['No2'] = no2_name
    extractWiki.getWikiInfo(no1_name, res)
   
   // res.json(result).status(200)
    fs.unlink(`./uploads/${filename}`, (err) => {
      if (err)
        console.log(err)
    })
   
  });
}
