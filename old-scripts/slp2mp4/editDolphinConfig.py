import configparser
def setCustomTexture(path, customTextures):
	config = configparser.RawConfigParser()
	config.read(path)
	print(config)
	config.set('Settings','HiresTextures', customTextures)
	with open(path, 'w') as file:
		config.write(file)