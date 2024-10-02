import json

player_table = []

def open_file(json_file_name):
    with open(json_file_name, 'r') as file:
        return json.load(file)
    
def player():
    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    for player in player_data:
        player_name = player['player_name']
        
