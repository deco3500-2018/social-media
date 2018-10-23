from instagram_private_api import Client, ClientCompatPatch
import sys
import json

# check that username is given
if len(sys.argv) < 2:
    sys.exit();

print('Looking for followings by ' + sys.argv[1] + '...')

# login
user_name = ""
password = ""
with open('login.config', 'r') as file:
    user_name = file.readline()
    password = file.readline()
api = Client(user_name, password)

# get user and follows
user_id = api.username_info(sys.argv[1])['user']['pk']
follows = api.user_following(user_id, api.generate_uuid())

# print follows
print(json.dumps(follows))