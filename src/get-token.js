const axios = require("axios");
module.exports = callback => {
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
      callback(token);
    })
    .catch(function(error) {
      console.log(error);
    });
};
