const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8000;

app.use(cors())

app.use(express.static('public'))


const dreamVille_artist = {
    'j cole': {
        'stageName': 'J Cole',
        'age': 39,
        'birthName': 'Jermaine Lamarr Cole',
        'image':'https://media.gq.com/photos/63c8d5a6cd63aa9138b13c7b/4:3/w_3639,h_2729,c_limit/1246142881',
        'otherNames': 'Therapist, Hollywood Cole, Kill Edward',
        'birthdate': '1985', 
        'birthLocation': 'Frankfurt, West Germany',
        'origin': 'Fayetteville, North-Carolina',
        'genre': 'Southern hip hop',
        'occupation': [ 'Rapper', 'Song writer', 'Record producer', 'Philanthropist', 'Record label manager', 'Singer', 'Basketball player'], 
        'yearsActive': '2007-present',
        'labels': ['Dreamville', 'Roc Nation', 'Interscope', 'Columbia',' ByStorm'],
        'children': 2
         }, 

     'bas' : {
        'stageName': 'Bas',
        'age': 37,
        'birthName': 'Abbas Hamad',
        'image':'https://static.wikia.nocookie.net/hip-hop-music/images/7/72/Bas.jpeg/revision/latest?cb=20191123161026',
        'otherNames': '',
        'birthdate': '1987', 
        'birthLocation': 'Paris, France',
        'origin': 'New York City, U.S',
        'genre': 'hip hop',
        'occupation': [ 'Rapper', 'Song writer'], 
        'yearsActive': '2010–present',
        'labels': ['Dreamville', 'Interscope'],
        'children': null
          }, 

     'cozz': {
        'stageName': 'Cozz',
        'age': 31,
        'birthName': 'Cody Rashad Osagie',
        'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsgr9V4tdYQcnRw3vbwG9IxvnEOwnuP9aBQ&s',
        'otherNames': '',
        'birthdate': '1993', 
        'birthLocation': 'Los Angeles, California',
        'origin': 'Los Angeles, California, U.S',
        'genre': 'hip hop',
        'occupation': [ 'Rapper', 'Song writer', 'producer'], 
        'yearsActive': '2013–present',
        'labels': ['Dreamville', 'Tha Committee', 'Interscope'],
        'children': null
    }, 

}



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// the colon before the artistName lets us know what ever comes after the colon is a query parameter
app.get('/api/:artistName', (req, res) => {
    //getting the query parameter and saving it in a variable 
    const artistes_name = req.params.artistName.toLowerCase()

    // checking if the query parameter is a valid artist name
    if(dreamVille_artist[artistes_name]) {
            res.json(dreamVille_artist[artistes_name])
        } else {
            res.json(dreamVille_artist) 
    }
    
}) 

// setting a new variable for a new port incase heroku decides not to use our created port 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`welcome to DREAMVILLE RECORDS where we listen to port ${PORT}`)
})