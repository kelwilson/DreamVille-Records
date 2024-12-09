const express = require('express');
const app = express();
// const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const {ObjectId} = require('mongodb');
const PORT = 5000;
require('dotenv').config()
// app.use(cors())




let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'dreamville-records'
    
    MongoClient.connect(dbConnectionStr /*, { useUnifiedTopology: true }*/)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

// const dreamVille_artist = {
//     'j cole': {
//         'stageName': 'J Cole',
//         'age': 39,
//         'birthName': 'Jermaine Lamarr Cole',
//         'image':'https://media.gq.com/photos/63c8d5a6cd63aa9138b13c7b/4:3/w_3639,h_2729,c_limit/1246142881',
//         'otherNames': 'Therapist, Hollywood Cole, Kill Edward',
//         'birthdate': '1985', 
//         'birthLocation': 'Frankfurt, West Germany',
//         'origin': 'Fayetteville, North-Carolina',
//         'genre': 'Southern hip hop',
//         'occupation': [ 'Rapper', 'Song writer', 'Record producer', 'Philanthropist', 'Record label manager', 'Singer', 'Basketball player'], 
//         'yearsActive': '2007-present',
//         'labels': ['Dreamville', 'Roc Nation', 'Interscope', 'Columbia',' ByStorm'],
//         'children': 2
//          }, 

//      'bas' : {
//         'stageName': 'Bas',
//         'age': 37,
//         'birthName': 'Abbas Hamad',
//         'image':'https://static.wikia.nocookie.net/hip-hop-music/images/7/72/Bas.jpeg/revision/latest?cb=20191123161026',
//         'otherNames': '',
//         'birthdate': '1987', 
//         'birthLocation': 'Paris, France',
//         'origin': 'New York City, U.S',
//         'genre': 'hip hop',
//         'occupation': [ 'Rapper', 'Song writer'], 
//         'yearsActive': '2010–present',
//         'labels': ['Dreamville', 'Interscope'],
//         'children': null
//           }, 

//      'cozz': {
//         'stageName': 'Cozz',
//         'age': 31,
//         'birthName': 'Cody Rashad Osagie',
//         'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsgr9V4tdYQcnRw3vbwG9IxvnEOwnuP9aBQ&s',
//         'otherNames': '',
//         'birthdate': '1993', 
//         'birthLocation': 'Los Angeles, California',
//         'origin': 'Los Angeles, California, U.S',
//         'genre': 'hip hop',
//         'occupation': [ 'Rapper', 'Song writer', 'producer'], 
//         'yearsActive': '2013–present',
//         'labels': ['Dreamville', 'Tha Committee', 'Interscope'],
//         'children': null
//     }, 

// }

app.get('/', (req, res) => {
    res.render('index.ejs')
    // db.collection('artists')
    // .find()
    // .toArray()
    // .then(data => {
    // //   console.log(data)
    //   res.render('index.ejs')
    // })
    // .catch(error => console.error(error))
    
    // res.sendFile(__dirname + '/index.html')
})

app.get('/allArtist', async (req, res) => {
    try {
      const data = await db.collection('artists').find().toArray()
      res.render('artist.ejs', {artist_Info: data})
    }
    catch(error) {
        console.error(error)
    }
})


// // the colon before the artistName lets us know what ever comes after the colon is a query parameter
// app.get('/api/:artistName', (req, res) => {
//     //getting the query parameter and saving it in a variable 
//     const artistes_name = req.params.artistName.toLowerCase()

//     // checking if the query parameter is a valid artist name
//     if(dreamVille_artist[artistes_name]) {
//             res.json(dreamVille_artist[artistes_name])
//         } else {
//             res.json(dreamVille_artist) 
//     }
    
// }) 

app.post('/addArtist', (req, res) => {
    const artistData = req.body;

    // Ensuring array inputs are handled as arrays
    // I'm trying to split the strings into arrays but no luck yet 😒‼️
    const otherNames = Array.isArray(artistData.otherNames) ? artistData.otherNames : [artistData.otherNames];
    const occupation = Array.isArray(artistData.occupation) ? artistData.occupation : [artistData.occupation];
    const labels = Array.isArray(artistData.labels) ? artistData.labels : [artistData.labels];

    // Construct new artist object
    const artist = {
        stageName: artistData.stageName,
        age: artistData.age,
        birthName: artistData.birthName,
        image: artistData.image,
        otherNames,
        birthYear: artistData.birthYear,
        birthLocation: artistData.birthLocation,
        origin: artistData.origin,
        genre: artistData.genre,
        occupation,
        yearsActive: artistData.yearsActive,
        labels,
        children: artistData.children,
        favorite: 0,
    };

    console.log(artist)
    db.collection('artists')
    .insertOne(artist)
    .then(result => {
        
        console.log('New Artist Added')
        res.redirect('/allArtist')
    })
    .catch(error => console.error(error))

})

app.put('/addFavorite', async (req, res) => {
    console.log(req.body.artistIdFromJSFile)

    try{
        await db.collection('artists').updateOne({_id: new ObjectId(req.body.artistIdFromJSFile)},
            {  $inc: {
                favorite: 1
            } },
        )
        console.log('one artist added as favorite')
        res.json('Love added successfully !!')
    } catch(err){
        console.log(err)
    }

})

app.delete('/deleteArtist', async (req, res) => {
    console.log('artist deleted')
    console.log(req.body.artistIdFromJSFile)

    try{
       let result = await db.collection('artists').deleteOne({_id: new ObjectId(req.body.artistIdFromJSFile)})
            /* Print a message that indicates whether the operation deleted a
            document */
            if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
             } else {
            console.log("No documents matched the query. Deleted 0 documents.");
      }
        console.log('one artist has been deleted from data base')
        res.json('Artist deleted successfully !!')
    } catch(err){
        console.log(err)
    }
})


// setting a new variable for a new port incase render decides not to use our created port 8000
app.listen(PORT, () => {
    console.log(`welcome to DREAMVILLE RECORDS where we listen to port ${PORT}`)
})