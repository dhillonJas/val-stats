import json 

def openfile(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

def writefile(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def get_agent(player_data, player_name, map_id):
    matched_agents = []

    for player in player_data:
        if player["player_map_id"] == map_id and player["player_name"] == player_name:
            matched_agents.append(player["player_agent"])

    if len(matched_agents) == 1:
        return matched_agents[0]
    elif len(matched_agents) > 1:
        return "Error: Multiple entries found. " + str(map_id)
    else:
        return "Error: No entry found. " + str(map_id)

def remove_player_head_to_head_key_in_table(player_data):
    for obj in player_data:
        obj.pop('player_head_to_head', None)


def headtohead():
    filename_r = 'src/data/tables/player_table.json'
    filename_w_player = 'src/data/tables/player_table.json'
    filename_w = 'src/data/tables/head_to_head_table.json'
    player_data = openfile(filename_r)
    players = []

    for player in player_data:
        player_dict = {}
        player_dict['player_name'] = player['player_name']
        player_dict['player_agent'] = player['player_agent']
        player_dict['map_name'] = player['map_name']
        player_dict['event_name'] = player['event_name']

        if player['player_head_to_head']:
            opponent_stats = {}
            for p, stats in player['player_head_to_head'].items():
                p_agent = get_agent(player_data, p, player['player_map_id'])
                new_stats = stats + [p_agent]
                opponent_stats[p] = new_stats
            
            player_dict['player_head_to_head'] = opponent_stats
            players.append(player_dict)

    writefile(filename_w, players)

    remove_player_head_to_head_key_in_table(player_data)
    writefile(filename_w_player, player_data)

headtohead()