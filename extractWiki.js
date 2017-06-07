const wiki = require('wiki-infobox')

exports.getWikiInfo = (dogname, res) => {
  let result = {
    "Name": "",
    // No2 : "",
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
    "AKC Group": ""
  }

  wiki(dogname, 'en', function(err, wikires){
    // console.log(wikires)
    // console.log(typeof(wikires))
    // console.log(wikires['nickname'])
    // console.log(wikires['country'])
    if (err) {
      console.log(err)
      return
    }
    result['Name'] = dogname
    if (wikires['nickname'] != undefined) 
      result['Nickname'] = wikires['nickname'].value
    else delete result['Nickname']

    if (wikires['country'] != undefined)
      result['Origin'] = wikires['country'].text
    else delete result['Origin']

    if (wikires['maleweight'] != undefined)
      result['Male Weight'] = wikires['maleweight'].value
    else delete result['Male Weight']

    if (wikires['femaleweight'] != undefined)
      result['Female Weight'] = wikires['femaleweight'].value
    else delete result['Female Weight']

    if (wikires['maleheight'] != undefined)
      result['Male Height'] = wikires['maleheight'].value
    else delete result['Male Height']

    if (wikires['femaleheight'] != undefined)
      result['Female Height'] = wikires['femaleheight'].value
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

    if (wikires['life_span'] != undefined)
      result['Life Span'] = wikires['life_span'].value
    else delete result['Life Span']

    if (wikires['coat'] != undefined)
      result['Coat'] = wikires['coat'].value
    else delete result['Coat']
    
    if (wikires['akcgroup'] != undefined)
      result['AKC Group'] = wikires['akcgroup'].value
    else delete result['AKC Group']

    console.log("==== Request PROCESSED!!!")
    res.json(result).status(200)
  })

  

  
}

// wiki("Labrador Retriever", function(err, wikires){
//   if (err) console.log(err)
//   else console.log(wikires)
// })