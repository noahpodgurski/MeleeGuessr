# v0.3.0
## Server
* Serves clips to client
* `/video/clip` 

## Site
* Clips load from server
* Clips are randomly selected

## Scripts
* (currently done with clippi, can be automated) - `.slp` are converted to `.json` containing data with highlights
* `splitHighlights.py` (rename to `convertslp.py` or something) 
  * `.json` and `.slp` together are turned into `.mp4`s
  * Then correctly transcoded for use in HTML5
  * Then create `clips.json`, for use in front end metadata - served from server at `/clips`

# v0.2.0
## Site
* More polish
* Toast
* Local high score
* Player and Character data
* Color coded player names
## Scripts
* Convert .slp file to make all colors neutral

# v0.1.0
* Base function complete
* Bar graph stats