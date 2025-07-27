# 3.1
* Added guess the controller

# 3.0
* Added clips from tournaments, and debug options, google tag, bugfixes

# 2.0
* Refactor to use slippilab and send .slps instead of video files

# 1.3
* Report button

# 1.2
* Fix aspect ratio (4:3)
* Made clips play quieter

# 1.1
* Removed loading icon after initial load
* Fix leaderboard sort and height
* Remove banned and duplicate players

# 1.0
* Release

# v1.0.0
## Server
* Clips load from S3 bucket instead
* Removed (only sending clips.json) - now stored on front end
* Added many clips from mang0 (netplay) .slp files

## Site
* Bugfixes (mostly with playback (loading, mute, hint, smoother feel))
* New loader
* Probably a lot of other stuff I can't remember right now...

# v0.6.0
## ?
* Undocumented changes...

# v0.5.0
## Scripts
* Added a few scripts to automate process of converting .slp into neutral/normal highlights

## Site
* Various Bugfixes
* Added `/clips` endpoint for viewing clips (normal) with all data shown (use in tandem with `clipDatasetBuilder.py` for entering player information)

# v0.4.0
## Site
* % and Stocks instead of score and lives
* Displays loading indicator while fetching clip (metadata)
* Updated index.html metadata
* Choices turn green/red after choosing to show correct answer
* Clips automatically load in after `2` seconds

# v0.3.0
## Server
* Serves clip metadata to client `/clips` 
* Serves videos to client `/video/clip` loads `/assets/clip.mp4`


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