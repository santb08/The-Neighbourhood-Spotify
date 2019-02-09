var express = require("express");
var app = express();
const axios = require("axios");
const getToken = require("./get-token.js");
app.use("/", express.static(__dirname + "/views"));

const config = {
  id: "61bb83bbbf4b495fb4c4c9893e3e91ec", //NjFiYjgzYmJiZjRiNDk1ZmI0YzRjOTg5M2UzZTkxZWM=
  band_id: "77SW9BnxLY8rJ0RciFqkHh",
  sec: "0b4d15da84e648f880a45bc35b80ec65", //MGI0ZDE1ZGE4NGU2NDhmODgwYTQ1YmMzNWI4MGVjNjU=
  red_uri: null
};

const api_routes = {
  artist: `https://api.spotify.com/v1/artists/${config.band_id}`,
  artist_top_tracks: `https://api.spotify.com/v1/artists/${
    config.band_id
  }/top-tracks?country=CO`,
  artist_albums: `https://api.spotify.com/v1/artists/${config.band_id}/albums`
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/artist", (req, res) => {
  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic NjFiYjgzYmJiZjRiNDk1ZmI0YzRjOTg5M2UzZTkxZWM6MGI0ZDE1ZGE4NGU2NDhmODgwYTQ1YmMzNWI4MGVjNjU="
    },
    params: {
      grant_type: "client_credentials"
    },
    auth: {
      username: "61bb83bbbf4b495fb4c4c9893e3e91ec",
      password: "0b4d15da84e648f880a45bc35b80ec65"
    }
  })
    .then(function(response) {
      const token = response.data.access_token;
      console.log(token);
      axios({
        url: api_routes.artist,
        method: "GET",
        headers: {
          Accept: "application/jsonp",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          const new_json = {
            images: response.data.images,
            genres: response.data.genres,
            followers: response.data.followers
          };
          console.log(new_json);
          // console.log(response.data);
          res.send(new_json);
        })
        .catch(function(error) {
          //
        });
    })
    .catch(function(error) {
      //
    });
});

app.get("/top-tracks", (req, res) => {
  const render_top_tracks = token => {
    axios({
      url: api_routes.artist_top_tracks,
      method: "GET",
      headers: {
        Accept: "application/jsonp",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const new_json = response.data;
        res.send(new_json);
      })
      .catch(err => console.log(err));
  };
  getToken(render_top_tracks);
});

app.get("/albums", (req, res) => {
  const render_top_tracks = token => {
    axios({
      url: api_routes.artist_albums,
      method: "GET",
      headers: {
        Accept: "application/jsonp",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const new_json = response.data;
        res.send(new_json);
      })
      .catch(err => console.log(err));
  };
  getToken(render_top_tracks);
});
//create a server object:
app.listen(8080, () => {
  console.log("Listening on port 8080");
}); //the server object listens on port 8080
