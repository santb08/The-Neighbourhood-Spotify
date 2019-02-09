This page has 3 content divs:
  Top tracks (most important thing): This content is filled by the data returned from Spotify API with the most played tracks on Spotify(Colombia) and you can even play a song preview by just CLICKING PLAY BUTTON AT THE LEFT OF THE SONG TITLE
  Albums: This is a block with all the albums that the band has released
  Biography/Info: This has some data in a table (Data from spotify api too) and a little biography (This was a copy-paste)



(Boring) Dev Story:
This is a pretty simple node-js server that shows an pretty simple page that gets data from a pretty simple api that was developed just for this case.
The idea was to consume some data from Spotify API, but that was kinda messy, so I decideded to create a little server to connect client-spotify data, but that was even worse.
Thinked about using JSONP to avoid CORS error, but it didn't even work.
Finally, I just created a route on the server so I could serve the HTML document I created using relative paths, and finally, it worked out.
