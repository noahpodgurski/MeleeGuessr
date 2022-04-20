import sys
# sys.path.append('../slippi') #use local slippi
import slippi
import json

MAKE_COSTUMES_NEUTRAL = False
THE_SEARCH_BUFFER = 50

def readJson(jsonFile):
	with open(jsonFile, "r") as f:
		data = json.load(f)
	return data

# file should be .json
def addCharacterToJson(jsonFile):
	playerCodeMap = {}
	data = readJson(jsonFile)
	for file in data['queue']:
		try:
			game = slippi.Game(file['path'])
		except:
			continue


		ports = []
		chars = []
		players = []
		for i in range(0, 4):
			try:
				chars.append(game.start.players[i].character)
				ports.append(i)
				if game.metadata.players:
					players.append(game.metadata.players[i].netplay)
			except:
				pass
		print(chars)
		print(ports)
		print(players)
		print(f"{chars[0]} vs {chars[1]}")
		if 26 in [x.value for x in chars]:
			continue #master hand :[

		for player in players:
			if player:
				if not playerCodeMap.get(player.code):
					playerCodeMap[player.code] = [player.name]
				elif player.name not in playerCodeMap[player.code]:
					playerCodeMap[player.code].append(player.name)

		# find who's doing the combo-ing here (starting/ending stock counts)
		endFrame = file['endFrame']
		char1StartStocks, char2StartStocks = game.frames[file['startFrame']].ports[ports[0]].leader.post.stocks, game.frames[file['startFrame']].ports[ports[1]].leader.post.stocks

		if endFrame > len(game.frames): #higher endframe for some reason?
			endFrame = len(game.frames)-1
			
		char1EndStocks, char2EndStocks = game.frames[endFrame].ports[ports[0]].leader.post.stocks, game.frames[endFrame].ports[ports[1]].leader.post.stocks

		#deduce winner
		if char1StartStocks - char1EndStocks < char2StartStocks - char2EndStocks: #char1 wins
			char = chars[0]
			player = players[0]
		elif char1StartStocks - char1EndStocks > char2StartStocks - char2EndStocks: #char2 wins
			char = chars[1]
			player = players[1]
		else:
			print(char1StartStocks, char2StartStocks)
			print(char1EndStocks, char2EndStocks)

			# Both characters had the same amount of stocks from start->end frames.
			#iterate thru frames from end frame, BACKWARDS, to find person who died last (can we overwrite everything with this algo?)
			for i in range(endFrame-1, file['startFrame']-1, -1):
				char1Stocks, char2Stocks = game.frames[i].ports[ports[0]].leader.post.stocks, game.frames[i].ports[ports[1]].leader.post.stocks
				if char1Stocks != char1EndStocks or char1Stocks == char1StartStocks: #char1 died last, char2 wins
					char = chars[1]
					player = players[1]
					break
				elif char2Stocks != char2EndStocks or char1Stocks == char1StartStocks: #char2 died last, char1 wins
					char = chars[0]
					player = players[0]
					break
			if not char:
				print(f"something's not right with {file}.. skipping")
				continue
				# raise Exception("Something isn't right...")


		if char and char.value:
			print(f'character is {char}')
			file['character'] = char.value
		else:
			file['character'] = ''
		if player and player.name:
			print(f'player is {player.name}')
			file['player'] = player.name
		else:
			file['player'] = ''
	
	print(playerCodeMap)
	with open("./playerCodeMap.json", "w") as f:
		json.dump(playerCodeMap, f, indent=2)

	with open(jsonFile, "w") as f:
		json.dump(data, f, indent=2)

if __name__ == "__main__":
	addCharacterToJson('E:/MeleeGuessrSlp/Player/Mang0/Game_20210823T180840.slp')