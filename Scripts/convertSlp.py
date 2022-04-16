import sys
sys.path.append('../slippi')
import slippi

MAKE_COSTUMES_NEUTRAL = True
THE_SEARCH_BUFFER = 50

if __name__ == "__main__":
	game = slippi.Game('C:/Users/Noah/Documents/Programming/Websites/MeleeGuessr/old.slp')
	print(game.start)
