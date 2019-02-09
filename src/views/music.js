const api_routes = {
  artist: `https://l9570y2zk9.sse.codesandbox.io/artist`,
  artist_top_tracks: `https://l9570y2zk9.sse.codesandbox.io/top-tracks`,
  artist_albums: `https://l9570y2zk9.sse.codesandbox.io/albums`
};

const fetch_conf = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer BQByAxSIWAJHJ73OMKYFRh8CJUOfWVfzV6UvXEge8KWpldPotMpN6W9lW5YsUKInE9Bw2crMJHLikO3PU7CzEcK5MqYnB4Rq4PeyPWLrVc5uaIMGPA4DNDunKQvmH1VLMuTtvLul5XZxYQbLLSsvkKocpb0NpuXYNvdc4w"
  }
};

fetch(api_routes.artist, fetch_conf)
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(json => doAllWithTheResponseArtist(json));

fetch(api_routes.artist_top_tracks, fetch_conf)
  .then(res => {
    return res.json();
  })
  .then(json => fillTopTracks(json));

fetch(api_routes.artist_albums, fetch_conf)
  .then(res => {
    return res.json();
  })
  .then(json => fillAlbums(json));

fillGallery = images => {
  images.forEach(image => {
    $("#gallery").append($("<img></img>").attr({ src: image.url }));
  });
};

addGenres = genres => {
  genres.forEach(genre => {
    $("#li-genres").append($("<ul></ul>").append($("<p></p").text(genre)));
  });
};

setFollowers = followers => {
  $("#followers").text(followers.total);
};

/*
  This function will be called in the promise after fetching
  This will fill the data on the page with the response
*/
doAllWithTheResponseArtist = json => {
  console.log(json);
  fillGallery(json.images);
  addGenres(json.genres);
  setFollowers(json.followers);
};

startSong = e => {
  $("#player").remove();
  $("body").append(
    $(
      `<audio id="player" autobuffer autoplay><source src="${
        e.id
      }" type="audio/mpeg"</audio>`
    )
  );
};

fillTopTracks = json => {
  json.tracks.forEach(track => {
    $("#top-tracks").append(
      $("<lu></lu>").append(
        $("<div></div>").append(
          $("<div></div>")
            .attr({
              class: "div-song",
              style: "display: inline-flex; align-content: center"
            })
            .append(
              $("<img></img>").attr({
                src: "image/play.png",
                class: "play-icon",
                id: track.preview_url,
                onClick: "startSong(this)"
              })
            )
            .append(
              $("<div></div>")
                .attr({ class: "song-title" })
                .append(
                  $("<a></a>")
                    .attr({
                      href: track.external_urls.spotify,
                      style: "color:black; text-decoration:none"
                    })
                    .text(track.name)
                )
            )
        )
      )
    );
  });
};

fillAlbums = json => {
  json.items.forEach(album => {
    $("#albums")
      .append(
        $("<ul></ul>").append(
          $("<a></a>")
            .attr({
              href: album.external_urls.spotify,
              style: "color:white; text-decoration:none"
            })
            .append(
              $("<div></div>")
                .append(
                  $("<img></img>").attr({
                    src:
                      album.images[
                        Math.floor(Math.random() * album.images.length)
                      ].url,
                    class: "album-logo"
                  })
                )
                .append($("<p></p>").text(album.name))
            )
        )
      )
      .attr({ class: "album" });
    console.log(album);
  });
};
