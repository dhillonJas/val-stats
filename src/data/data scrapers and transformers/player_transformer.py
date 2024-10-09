import json

player_table = []

def open_file(json_file_name):
    with open(json_file_name, 'r') as file:
        return json.load(file)
    
def get_info_from_id(map_id,team_id, maps, teams, matches, events):
    res_dict = {
        'map_name':'',
        'opponent_name':'',
        'opponent_region':'',
        'map_won':-1,
        'match_won':-1,
        'match_length':'Bo?',
        'event_name':'',
        'rounds_played':{'attack':0, 'defense':0}
    }
    map_obj = next((item for item in maps if item['map_id'] == map_id), None)
    match_obj = next((item for item in matches if item['match_id'] == map_obj['map_match_id']), None)
    event_obj = next((item for item in events if item['event_id'] == match_obj['match_event_id']), None)
    opponent_id = map_obj['map_winner_id'] if map_obj['map_winner_id'] != team_id else map_obj['map_loser_id']
    res_dict['map_name'] = map_obj['map_name']
    res_dict['opponent_name'] = teams[str(opponent_id)]['team_name'] 
    res_dict['opponent_region'] = teams[str(opponent_id)]['team_region']
    res_dict['map_won'] = True if map_obj['map_winner_id'] == team_id else False
    res_dict['match_length'] = match_obj['match_best_of']
    res_dict['match_won'] = True if match_obj['match_winner_id'] == team_id else False
    res_dict['event_name'] = event_obj['event_name']


    if res_dict['map_won']:
        res_dict['rounds_played']['attack'] = map_obj['map_winner_attack_rounds'] + map_obj['map_loser_defense_rounds']
        res_dict['rounds_played']['defense'] = map_obj['map_winner_defense_rounds'] + map_obj['map_loser_attack_rounds']
    else:
        res_dict['rounds_played']['attack'] = map_obj['map_loser_attack_rounds'] + map_obj['map_winner_defense_rounds']
        res_dict['rounds_played']['defense'] = map_obj['map_loser_defense_rounds'] + map_obj['map_winner_attack_rounds']

    return res_dict
 

def player():
    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    for player in player_data:
        info_dict = get_info_from_id(player['player_map_id'] , player['player_team_id'], map_data, team_data, match_data, event_data)
        player['kills'] = {'all': 0, 'attack':0, 'defense':0}
        player['kills']['all'] = player.pop('player_both_kills')
        player['kills']['attack'] = player.pop('player_t_kills')
        player['kills']['defense'] = player.pop('player_ct_kills')

        player['deaths'] = {'all': 0, 'attack':0, 'defense':0}
        player['deaths']['all'] = player.pop('player_both_deaths')
        player['deaths']['attack'] = player.pop('player_t_deaths')
        player['deaths']['defense'] = player.pop('player_ct_deaths')

        player['assists'] = {'all': 0, 'attack':0, 'defense':0}
        player['assists']['all'] = player.pop('player_both_assists')
        player['assists']['attack'] = player.pop('player_t_assists')
        player['assists']['defense'] = player.pop('player_ct_assists')

        player['rating'] = {'all': 0, 'attack':0, 'defense':0}
        player['rating']['all'] = player.pop('player_both_rating')
        player['rating']['attack'] = player.pop('player_t_rating')
        player['rating']['defense'] = player.pop('player_ct_rating')
        
        player['acs'] = {'all': 0, 'attack':0, 'defense':0}
        player['acs']['all'] = player.pop('player_both_acs')
        player['acs']['attack'] = player.pop('player_t_acs')
        player['acs']['defense'] = player.pop('player_ct_acs')

        player['diffs'] = {'all': 0, 'attack':0, 'defense':0}
        player['diffs']['all'] = (int)(player.pop('player_both_diffs'))
        player['diffs']['attack'] = (int)(player.pop('player_t_diffs'))
        player['diffs']['defense'] = (int)(player.pop('player_ct_diffs'))

        player['kast'] = {'all': 0, 'attack':0, 'defense':0}
        player['kast']['all'] = (int)(player.pop('player_both_kast').strip('%'))
        player['kast']['attack'] = (int)(player.pop('player_t_kast').strip('%'))
        player['kast']['defense'] = (int)(player.pop('player_ct_kast').strip('%'))

        player['adr'] = {'all': 0, 'attack':0, 'defense':0}
        player['adr']['all'] = player.pop('player_both_adr')
        player['adr']['attack'] = player.pop('player_t_adr')
        player['adr']['defense'] = player.pop('player_ct_adr')

        player['hsp'] = {'all': 0, 'attack':0, 'defense':0}
        player['hsp']['all'] = (int)(player.pop('player_both_hsp').strip('%'))
        player['hsp']['attack'] = (int)(player.pop('player_t_hsp').strip('%'))
        player['hsp']['defense'] = (int)(player.pop('player_ct_hsp').strip('%'))

        player['first_kills'] = {'all': 0, 'attack':0, 'defense':0}
        player['first_kills']['all'] = player.pop('player_both_first_kills')
        player['first_kills']['attack'] = player.pop('player_t_first_kills')
        player['first_kills']['defense'] = player.pop('player_ct_first_kills')

        player['first_deaths'] = {'all': 0, 'attack':0, 'defense':0}
        player['first_deaths']['all'] = player.pop('player_both_first_deaths')
        player['first_deaths']['attack'] = player.pop('player_t_first_deaths')
        player['first_deaths']['defense'] = player.pop('player_ct_first_deaths')

        if '5k' in player['player_multis_clutches_stats']:
            player['Aces'] = player['player_multis_clutches_stats']['5k']
            player['2k'] = player['player_multis_clutches_stats']['2k']
            player['3k'] = player['player_multis_clutches_stats']['3k']
            player['4k'] = player['player_multis_clutches_stats']['4k']

            player['1v1'] = player['player_multis_clutches_stats']['1v1']
            player['1v2'] = player['player_multis_clutches_stats']['1v2']
            player['1v3'] = player['player_multis_clutches_stats']['1v3']
            player['1v4'] = player['player_multis_clutches_stats']['1v4']
            player['1v5'] = player['player_multis_clutches_stats']['1v5']

        del player['player_multis_clutches_stats']

        player.update(info_dict)

    player_table_file = 'src/data/tables/player_table.json'
    with open(player_table_file, 'w') as file:
        json.dump(player_data, file, indent=4)

player()
        
