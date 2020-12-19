import hashlib

#create hash for each password of the top 10000 passwords, and compare that hash to 
#the hash submitted to the function. if use_salts is true, place each sale from known
#salts at the beginning of the top10000 password and then hash, do the same for that
#same password, but add the salt to the end of the password instead. If no match is 
#found, move on. 

def crack_sha1_hash(hash, use_salts = False):
	salts = []
	passes = []
	with open('known-salts.txt', 'rt') as knownsalts:
		for salt in knownsalts:
			salts.append(salt.rstrip())
	with open('top-10000-passwords.txt', 'rt') as passwords:
		for password in passwords:
			passes.append(password.rstrip())

	if use_salts:
		for password in passes:
			saltypasses = []
			for salt in salts:
				saltypasses.append(salt + password + salt)
				saltypasses.append(salt+password)
				saltypasses.append(password+salt)
			for saltedpass in saltypasses:
				passhash = hashlib.sha1()
				passhash.update(saltedpass.encode('utf-8'))
				hashstring = passhash.hexdigest()
				if hashstring == hash:
					return password
		return 'PASSWORD NOT IN DATABASE'
	else:
		for password in passes:
			passhash = hashlib.sha1()
			passhash.update(password.encode('utf-8'))
			hashstring = passhash.hexdigest()
			if hashstring == hash: 
				return password
		return 'PASSWORD NOT IN DATABASE'