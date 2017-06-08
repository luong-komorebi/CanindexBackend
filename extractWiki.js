const wiki = require('wiki-infobox')
const request = require('request')



exports.getWikiInfo = (dogname, res) => {
  let result = {
    "Name": "",
    "Origin": "",
    "Nickname": "",
    "Male Weight": "",
    "Female Weight": "",
    "Male Height": "",
    "Female Height": "",
    "Color": "",
    "Litter Size": "",
    "Life Span": "",
    "Coat": "",
    "AKC Group": "",
    "Story": "",
  }
  

  wiki(dogname, 'en',  function(err, wikires){

    if (err) {
      console.log(err)
      return
    }
    // console.log(wikires)
    result['Name'] = dogname
    if (wikires['nickname'] != undefined) {
      wikires['nickname'].value =  wikires['nickname'].value.replace('<br>', ' ')
      result['Nickname'] = wikires['nickname'].value
    }
    else delete result['Nickname']

    if (wikires['country']) {
      if (wikires['country'] instanceof Array) {
        for( item in wikires['country']) {
          result['Origin'] += wikires['country'][item].text
          result['Origin'] += ' '
        }
      }
      else result['Origin'] = wikires['country'].text
    }
    else delete result['Origin']


    if (wikires['maleweight'] != undefined) {
      wikires['maleweight'].value = wikires['maleweight'].value.replace('{{convert', '')
      wikires['maleweight'].value = wikires['maleweight'].value.replace('}}', '')
      wikires['maleweight'].value = wikires['maleweight'].value.replace('abbr', '')
      wikires['maleweight'].value = wikires['maleweight'].value.replace(/\|/g, '')
      wikires['maleweight'].value = wikires['maleweight'].value.replace('lbkg', '/ lb - kg')

      result['Male Weight'] = wikires['maleweight'].value
    }
    else delete result['Male Weight']

    if (wikires['femaleweight'] != undefined) {
      wikires['femaleweight'].value = wikires['femaleweight'].value.replace('{{convert', '')
      wikires['femaleweight'].value = wikires['femaleweight'].value.replace('}}', '')
      wikires['femaleweight'].value = wikires['femaleweight'].value.replace('abbr', '')
      wikires['femaleweight'].value = wikires['femaleweight'].value.replace(/\|/g, '')
      wikires['femaleweight'].value = wikires['femaleweight'].value.replace('lbkg', '/ lb - kg')
      
      result['Female Weight'] = wikires['femaleweight'].value
    }
    else delete result['Female Weight']

    if (wikires['maleheight'] != undefined) {
      wikires['maleheight'].value = wikires['maleheight'].value.replace('{{convert', '')
      wikires['maleheight'].value = wikires['maleheight'].value.replace('}}', '')
      wikires['maleheight'].value = wikires['maleheight'].value.replace('abbr', '')
      wikires['maleheight'].value = wikires['maleheight'].value.replace(/\|/g, '')
      wikires['maleheight'].value = wikires['maleheight'].value.replace('incm', '/ in - cm')

      result['Male Height'] = wikires['maleheight'].value
    }
    else delete result['Male Height']

    if (wikires['femaleheight'] != undefined) {
      wikires['femaleheight'].value = wikires['femaleheight'].value.replace('{{convert', '')
      wikires['femaleheight'].value = wikires['femaleheight'].value.replace('}}', '')
      wikires['femaleheight'].value = wikires['femaleheight'].value.replace('abbr', '')
      wikires['femaleheight'].value = wikires['femaleheight'].value.replace(/\|/g, '')
      wikires['femaleheight'].value = wikires['femaleheight'].value.replace('incm', '/ in - cm')
      result['Female Height'] = wikires['femaleheight'].value
    }
    else delete result['Female Height']

    if (wikires['color'] != undefined || wikires['colour']!= undefined) {
      if (wikires['color'])
        result['Color'] = wikires['color'].value
      else if (wikires['colour'])
        result['Color'] = wikires['colour'].value
    }
    else delete result['Color']

    if (wikires['litter_size'] != undefined)
      result['Litter Size'] = wikires['litter_size'].value
    else delete result['Litter Size']

    if (wikires['life_span'] != undefined) {
      wikires['life_span'].value = wikires['life_span'].value.replace('<ref name', ' ')
      result['Life Span'] = wikires['life_span'].value
    }
    else delete result['Life Span']

    if (wikires['coat'] != undefined)
      result['Coat'] = wikires['coat'].value
    else delete result['Coat']
    
    if (wikires['akcgroup'] != undefined)
      result['AKC Group'] = wikires['akcgroup'].value
    else delete result['AKC Group']

    let templink = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + wikires['name'].value.replace(' ', '%20')
    request(templink, function (err, response, body) {
      let val = JSON.parse(body)
      //console.log(val.query.pages)
      let value = val['query']['pages']
      //console.log(value)
      let key = Object.keys(value)[0]
      result['Story'] = value[key].extract


      res.json(result).status(200)
    })
    

    console.log(result)
    console.log("==== Request PROCESSED!!!")
    

  })

  

  
}

// wiki("Labrador Retriever", function(err, wikires){
//   if (err) console.log(err)
//   else console.log(wikires)
// })