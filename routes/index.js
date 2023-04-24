var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/artist-search', function(req, res, next) {
  // artistName = document.getElementById("artist").value;
  // spotifyApi.search(artistName);
  spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    console.log('The received data from the API: ', data.body);
    console.log(data.body.artists.items);
    res.render('artist-search', data.body.artists)
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
});


module.exports = router;
