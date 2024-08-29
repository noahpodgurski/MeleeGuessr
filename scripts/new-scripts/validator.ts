const { SlippiGame } = require("@slippi/slippi-js");

const isValidSlippi = (inFile = "../slp-test/test.slp") => {
    try {

        const game = new SlippiGame();
        
        // Get game settings – stage, characters, etc
        const settings = game.getSettings();
        console.log(settings);
        
        // Get metadata - start time, platform played on, etc
        const metadata = game.getMetadata();
        console.log(metadata);
        
        // Get computed stats - openings / kill, conversions, etc
        const stats = game.getStats();
        console.log(stats);
        
        // Get frames – animation state, inputs, etc
        // This is used to compute your own stats or get more frame-specific info (advanced)
        const frames = game.getFrames();
        frames[0].players = null;
        return true;
    } catch(err) {
        return false;
    }
}

console.log(isValidSlippi('./source.slp'));