import sys
# sys.path.append('../slippi') #use local slippi
import slippi
import json

MAKE_COSTUMES_NEUTRAL = False
THE_SEARCH_BUFFER = 50

def addCharacterToJson(fileUrl):
	with open(fileUrl, "r") as f:
		data = json.load(f)
		for file in data['queue']:
			game = slippi.Game(file['path'])
			ports = []
			chars = []
			for i in range(0, 4):
				try:
					chars.append(game.start.players[i].character)
					ports.append(i)
				except:
					pass
			print(chars)
			print(ports)
			
			# find who's doing the combo-ing here (starting/ending stock counts)
			endFrame = file['endFrame']
			char1StartStocks, char2StartStocks = game.frames[file['startFrame']].ports[ports[0]].leader.post.stocks, game.frames[file['startFrame']].ports[ports[1]].leader.post.stocks

			if endFrame > len(game.frames): #higher endframe for some reason?
				endFrame = len(game.frames)-1
				
			char1EndStocks, char2EndStocks = game.frames[endFrame].ports[ports[0]].leader.post.stocks, game.frames[endFrame].ports[ports[1]].leader.post.stocks

			#deduce winner
			if char1StartStocks - char1EndStocks < char2StartStocks - char2EndStocks: #char1 wins
				char = chars[0]
			elif char1StartStocks - char1EndStocks > char2StartStocks - char2EndStocks: #char2 wins
				char = chars[1]
			else:
				print(char1StartStocks, char2StartStocks)
				print(char1EndStocks, char2EndStocks)

				# Both characters had the same amount of stocks from start->end frames.
				#iterate thru frames from end frame, BACKWARDS, to find person who died last (can we overwrite everything with this algo?)
				for i in range(endFrame-1, file['startFrame']-1, -1):
					char1Stocks, char2Stocks = game.frames[i].ports[ports[0]].leader.post.stocks, game.frames[i].ports[ports[1]].leader.post.stocks
					if char1Stocks != char1EndStocks or char1Stocks == char1StartStocks: #char1 died last, char2 wins
						char = chars[1]
						break
					elif char2Stocks != char2EndStocks or char1Stocks == char1StartStocks: #char2 died last, char1 wins
						char = chars[0]
						break
				if not char:
					raise Exception("Something isn't right...")



			print(char)
			file['character'] = char.value
	
	print(data)
	with open(fileUrl, "w") as f:
		json.dump(data, f, indent=2)

