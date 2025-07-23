# MeleeGuessr

Think you can really guess who's playing that captain falcon - based solely off the movement? Now's your chance! Visit [MeleeGuessr](https://www.MeleeGuessr.com) and play now!

## CLIP GENERATION ##
1. Run clippi on directory of .slps - name .json output as profile name (ex: default.json, bettercombos.json)
2. Edit convert.ts to target above output json file and run `ts-node convert.ts`
3. Copy \\NOAH-PC\Clout\Backups\MeleeGuessrSlp\2.0\converted\all.json to meleeguessr-server\clips.json
4. Run `npm run test`, it will cleanup the clips.json and cut clips directory, run again (should be success)
5. Verify clips.json and clips files match in length, **(make sure clips s3 BUCKET is empty)** run `npm run upload`
6. Deploy new API with `npm run sam`

### TODOS ###
1. ~~Scoring & Leaderboard~~
2. Guess the controller! (Clips of fox/marth/pikachu), guess if classic or box controller
3. Optimizations: 
    
    a. What else can we strip from .slp file? (player input maybe? Other game settings not necessary? Any data transfer saved would save $$$)
    
    b. Look again at stripping beginning from slp (probably not possible (?) unless player states could be saved (which *probabbllyyy* takes up >= space))
4. ~~Make more character-diverse combos (current clip state:)~~
    ```
    Falco: 863,
    Marth: 407,
    Fox: 230,
    Captain Falcon: 78,
    Sheik: 29,
    Luigi: 2,
    Samus: 1,
    Roy: 1,
    Jigglypuff: 1,
    Donkey Kong: 1,
    Yoshi: 1,
    Mario: 1,
    Link: 1,
    Peach: 1
    __________________
    Mang0: 930,
    Zain: 185,
    KoDoRiN: 173,
    S2J: 65,
    null: 44,
    Reeve: 28,
    Fiction: 28,
    Magi: 27,
    Albert: 26,
    Spark: 18,
    TheRealThing: 16,
    KJH: 15,
    Cody Schwab: 14,
    Lucky: 9,
    ???: 5,
    Gahtzu: 8,
    Rishi: 7,
    SFAT: 5,
    Shroomed: 1,
    Ginger: 1,
    Wizzrobe: 1,
    2saint: 1,
    Plup: 3,
    JoshMan: 2,
    N3zModGod: 1,
    Asashi: 1,
    Medz: 2,
    lloD: 1
    ```

5. Filter for combos ??? (doesn't affect high score)
6. Add missing projectiles/items to game
    a. Pikachu/pichu down b
7. Login improvements:
    1. Backend

        a. Add rate limiting to login endpoint (express-rate-limit?)

        ~~b. Token expiration~~

        c. Token storage (use httpOnly cookies)
        
    2. Frontend
    
        a. Instead of storing the JWT in localStorage, consider using secure cookies to store the token and enable the httpOnly and Secure flags to mitigate potential XSS attacks.

        ~~b. When the token expires or is invalid, make sure to handle such cases (e.g., force logout if an invalid token is detected).~~
