import json
import re
import copy
team_stats = {}

round_side_dict = {
    'attack':0,
    'defense':0,
    'all':0
}
map_side_dict = {
    'attack':0,
    'defense':0,
    'overtime':0,
    'all':0
}
best_of_dic = {
    'Bo3':0,
    'Bo5':0,
    'all':0
}
stats_dic = {
    'name':'',
    'region':'',
    'maps_won': 0,
    'maps_lost': 0,
    'map_picks_won': 0,
    'map_picks_lost': 0,
    'rounds_won': dict(map_side_dict),
    'rounds_lost': dict(map_side_dict),
    'matches_won': dict(best_of_dic),
    'matches_lost': dict(best_of_dic),
    'kills':dict(round_side_dict),
    'deaths':dict(round_side_dict),
    'assists':dict(round_side_dict),
    'diffs':dict(round_side_dict),
    'first_kills':dict(round_side_dict),
    'first_deaths':dict(round_side_dict),
    'Aces':0,
    '2k':0,
    '3k':0,
    '4k':0,
    '1v1':0,
    '1v2':0,
    '1v3':0,
    '1v4':0,
    '1v5':0
}

def open_file(json_file_name):
    with open(json_file_name, 'r') as file:
        return json.load(file)
    
def is_better_position(paramA, paramB):
    # Helper function to extract the rank as an integer or range
    def extract_rank(position):
        # Find all numbers in the position (handles cases like '5th-6th')
        ranks = list(map(int, re.findall(r'\d+', position)))
        # Return the lowest rank (e.g. from '5th-6th' -> 5)
        return min(ranks)
    
    # Extract the numeric values of both positions
    rankA = extract_rank(paramA)
    rankB = extract_rank(paramB)

    # Return True if rankA is better (smaller number means better position)
    return rankA < rankB

def find_best_placement(team_id, events):
    results = ['100th' , []]
    for event in events:
        for placement, teams in event['event_all_team_standings'].items():
            if (isinstance(teams, int) and teams == team_id) or (isinstance(teams, list) and team_id in teams):
                if is_better_position(placement, results[0]):
                    results[0] = placement
                    results[1] = [event['event_name']]
                elif placement in results[0]:
                    results[1].append(event['event_name'])
    
    return [item for sublist in results for item in (sublist if isinstance(sublist, list) else [sublist])]

def team_map_stats(maps):


    for map in maps:
        if map['map_winner_id'] not in team_stats:
            team_stats.update({map['map_winner_id'] : copy.deepcopy(stats_dic)})
        if map['map_loser_id'] not in team_stats:
            team_stats.update({map['map_loser_id'] : copy.deepcopy(stats_dic)})

        team_stats[map['map_winner_id']]['name'] = map['map_winner']
        team_stats[map['map_loser_id']]['name'] = map['map_loser']
        team_stats[map['map_winner_id']]['maps_won'] += 1
        team_stats[map['map_loser_id']]['maps_lost'] += 1

        if map['map_pick'] == map['map_winner']:
            team_stats[map['map_winner_id']]['map_picks_won'] += 1
        if map['map_pick'] == map['map_loser']:
            team_stats[map['map_loser_id']]['map_picks_lost'] += 1

        team_stats[map['map_winner_id']]['rounds_won']['all'] += map['map_winner_score']
        team_stats[map['map_loser_id']]['rounds_won']['all'] += map['map_loser_score']
       
        team_stats[map['map_winner_id']]['rounds_won']['attack'] += map['map_winner_attack_rounds']
        team_stats[map['map_loser_id']]['rounds_won']['attack'] += map['map_loser_attack_rounds']
        
        team_stats[map['map_winner_id']]['rounds_won']['defense'] += map['map_winner_defense_rounds']
        team_stats[map['map_loser_id']]['rounds_won']['defense'] += map['map_loser_defense_rounds']

        team_stats[map['map_winner_id']]['rounds_won']['overtime'] += map['map_winner_overtime_rounds']
        team_stats[map['map_loser_id']]['rounds_won']['overtime'] += map['map_loser_overtime_rounds']



        team_stats[map['map_winner_id']]['rounds_lost']['all'] += map['map_loser_score']
        team_stats[map['map_loser_id']]['rounds_lost']['all'] += map['map_winner_score']
       
        team_stats[map['map_winner_id']]['rounds_lost']['attack'] += map['map_loser_attack_rounds']
        team_stats[map['map_loser_id']]['rounds_lost']['attack'] += map['map_winner_attack_rounds']
        
        team_stats[map['map_winner_id']]['rounds_lost']['defense'] += map['map_loser_defense_rounds']
        team_stats[map['map_loser_id']]['rounds_lost']['defense'] += map['map_winner_defense_rounds']

        team_stats[map['map_winner_id']]['rounds_lost']['overtime'] += map['map_loser_overtime_rounds']
        team_stats[map['map_loser_id']]['rounds_lost']['overtime'] += map['map_winner_overtime_rounds']

        

def team_match_stats(matches):
    for match in matches:
        team_stats[match['match_winner_id']]['matches_won']['all'] += 1
        team_stats[match['match_loser_id']]['matches_lost']['all'] += 1

        team_stats[match['match_winner_id']]['matches_won'][match['match_best_of']] += 1
        team_stats[match['match_loser_id']]['matches_lost'][match['match_best_of']] += 1
        
def team_player_stats(players):
    for player in players:
        team_stats[player['player_team_id']]['kills']['attack'] += player['player_t_kills']
        team_stats[player['player_team_id']]['kills']['defense'] += player['player_ct_kills']
        team_stats[player['player_team_id']]['kills']['all'] += player['player_both_kills']
        
        team_stats[player['player_team_id']]['deaths']['attack'] += player['player_t_deaths']
        team_stats[player['player_team_id']]['deaths']['defense'] += player['player_ct_deaths']
        team_stats[player['player_team_id']]['deaths']['all'] += player['player_both_deaths']
        
        team_stats[player['player_team_id']]['assists']['attack'] += player['player_t_assists']
        team_stats[player['player_team_id']]['assists']['defense'] += player['player_ct_assists']
        team_stats[player['player_team_id']]['assists']['all'] += player['player_both_assists']
        
        team_stats[player['player_team_id']]['diffs']['attack'] += (int)(player['player_t_diffs'])
        team_stats[player['player_team_id']]['diffs']['defense'] += (int)(player['player_ct_diffs'])
        team_stats[player['player_team_id']]['diffs']['all'] += (int)(player['player_both_diffs'])

        team_stats[player['player_team_id']]['first_kills']['attack'] += player['player_t_first_kills']
        team_stats[player['player_team_id']]['first_kills']['defense'] += player['player_ct_first_kills']
        team_stats[player['player_team_id']]['first_kills']['all'] += player['player_both_first_kills']

        team_stats[player['player_team_id']]['first_deaths']['attack'] += player['player_t_first_deaths']
        team_stats[player['player_team_id']]['first_deaths']['defense'] += player['player_ct_first_deaths']
        team_stats[player['player_team_id']]['first_deaths']['all'] += player['player_both_first_deaths']

        if player['player_multis_clutches_stats']:
            team_stats[player['player_team_id']]['Aces'] += player['player_multis_clutches_stats']['5k']
            team_stats[player['player_team_id']]['2k'] += player['player_multis_clutches_stats']['2k']
            team_stats[player['player_team_id']]['3k'] += player['player_multis_clutches_stats']['3k']
            team_stats[player['player_team_id']]['4k'] += player['player_multis_clutches_stats']['4k']

            team_stats[player['player_team_id']]['1v1'] += player['player_multis_clutches_stats']['1v1']
            team_stats[player['player_team_id']]['1v2'] += player['player_multis_clutches_stats']['1v2']
            team_stats[player['player_team_id']]['1v3'] += player['player_multis_clutches_stats']['1v3']
            team_stats[player['player_team_id']]['1v4'] += player['player_multis_clutches_stats']['1v4']
            team_stats[player['player_team_id']]['1v5'] += player['player_multis_clutches_stats']['1v5']
        
        
def team_event_stats(team_id, events, players, maps, matches, teams):
    
    team_events_attended = [event for event in events if team_id in event['event_all_teams']]

    team_stats[team_id]['event_stats'] = {}
    
    for event in team_events_attended:
        event_id = event['event_id']
        event_stats_dic = {
        'event_name:': event['event_name'],
        'event_maps':{}
        }
        team_stats[team_id]['event_stats'].update({event_id:event_stats_dic.copy()})
        # all matches team_id played in event
        all_matches = [match['match_id'] 
                       for match in matches 
                       if match['match_event_id'] == event['event_id'] 
                       and (match['match_winner_id'] == team_id 
                            or match['match_loser_id'] == team_id)]

        for map in maps:
            if map['map_match_id'] in all_matches:
                map_name = map['map_name']
                map_obj = team_stats[team_id]['event_stats'][event_id]['event_maps']
                
                if map_name not in map_obj:
                    map_obj.update({map_name:{}})


                team_name = teams[str(team_id)]['team_name']
                opponent_team_id = map['map_winner_id'] if map['map_winner_id'] != team_id else map['map_loser_id']
                opponent_team_name = teams[str(opponent_team_id)]['team_name']
                opponent_team_region = teams[str(opponent_team_id)]['team_region']

                if opponent_team_id not in map_obj[map_name]:
                    map_obj[map_name].update({opponent_team_id:copy.deepcopy(stats_dic)})

                opponent_obj = map_obj[map_name][opponent_team_id]
                opponent_obj['name'] = opponent_team_name
                opponent_obj['region'] = opponent_team_region

                team_id_result = 'winner' if team_id == map['map_winner_id'] else 'loser'
                opponent_team_result = 'winner' if team_id_result == 'loser' else 'loser'

                opponent_obj['rounds_won']['all'] += map['map_'+team_id_result+'_score']
                opponent_obj['rounds_lost']['all'] += map['map_'+opponent_team_result+'_score']

                opponent_obj['rounds_won']['attack'] += map['map_'+team_id_result+'_attack_rounds']
                opponent_obj['rounds_lost']['attack'] += map['map_'+opponent_team_result+'_attack_rounds']

                opponent_obj['rounds_won']['defense'] += map['map_'+team_id_result+'_defense_rounds']
                opponent_obj['rounds_lost']['defense'] += map['map_'+opponent_team_result+'_defense_rounds']

                opponent_obj['rounds_won']['overtime'] += map['map_'+team_id_result+'_overtime_rounds']
                opponent_obj['rounds_lost']['overtime'] += map['map_'+opponent_team_result+'_overtime_rounds']

                if team_id == map['map_winner_id']:
                    if team_name == map['map_pick']:
                        opponent_obj['map_picks_won'] += 1
                    opponent_obj['maps_won'] += 1
                elif team_id == map['map_loser_id']:
                    if team_name == map['map_pick']:
                        opponent_obj['map_picks_lost'] += 1
                    opponent_obj['maps_lost'] += 1

        # all maps team_id played in event        
        all_maps = {}
        for map_obj in maps:
            if map_obj['map_match_id'] in all_matches:
                opponent_team_id = map_obj['map_winner_id'] if map_obj['map_winner_id'] != team_id else map_obj['map_loser_id']
                all_maps.update({map_obj['map_id']: {
                                                            'map_name':map_obj['map_name'],
                                                            'map_opponent': opponent_team_id
                }})
                
        all_maps_list = list(all_maps.keys())
        for player in players:
            if player['player_map_id'] in all_maps_list and player['player_team_id'] == team_id:
                map_name = all_maps[player['player_map_id']]['map_name']
                map_opponent = all_maps[player['player_map_id']]['map_opponent']
                opponent_obj = team_stats[team_id]['event_stats'][event_id]['event_maps'][map_name][map_opponent]

                opponent_obj['kills']['attack'] += player['player_t_kills']
                opponent_obj['kills']['defense'] += player['player_ct_kills']
                opponent_obj['kills']['all'] += player['player_both_kills']

                opponent_obj['deaths']['attack'] += player['player_t_deaths']
                opponent_obj['deaths']['defense'] += player['player_ct_deaths']
                opponent_obj['deaths']['all'] += player['player_both_deaths']

                opponent_obj['assists']['attack'] += player['player_t_assists']
                opponent_obj['assists']['defense'] += player['player_ct_assists']
                opponent_obj['assists']['all'] += player['player_both_assists']

                opponent_obj['diffs']['attack'] += (int)(player['player_t_diffs'])
                opponent_obj['diffs']['defense'] += (int)(player['player_ct_diffs'])
                opponent_obj['diffs']['all'] += (int)(player['player_both_diffs'])

                opponent_obj['first_kills']['attack'] += player['player_t_first_kills']
                opponent_obj['first_kills']['defense'] += player['player_ct_first_kills']
                opponent_obj['first_kills']['all'] += player['player_both_first_kills']

                opponent_obj['first_deaths']['attack'] += player['player_t_first_deaths']
                opponent_obj['first_deaths']['defense'] += player['player_ct_first_deaths']
                opponent_obj['first_deaths']['all'] += player['player_both_first_deaths']

                if player['player_multis_clutches_stats']:
                    opponent_obj['Aces'] += player['player_multis_clutches_stats']['5k']
                    opponent_obj['2k'] += player['player_multis_clutches_stats']['2k']
                    opponent_obj['3k'] += player['player_multis_clutches_stats']['3k']
                    opponent_obj['4k'] += player['player_multis_clutches_stats']['4k']

                    opponent_obj['1v1'] += player['player_multis_clutches_stats']['1v1']
                    opponent_obj['1v2'] += player['player_multis_clutches_stats']['1v2']
                    opponent_obj['1v3'] += player['player_multis_clutches_stats']['1v3']
                    opponent_obj['1v4'] += player['player_multis_clutches_stats']['1v4']
                    opponent_obj['1v5'] += player['player_multis_clutches_stats']['1v5']
                    

def flattenEventStats(team_stats_r):


    for team in team_stats_r:
        flattened_stats = []
        for event_id, event_info in team['event_stats'].items():
            event_name = ''
            for key, event_maps in event_info.items():
                if key == 'event_name:':
                    event_name = event_maps
                elif key == 'event_maps':
                    for mapname, opponents in event_maps.items():
                        for opponent, stats in opponents.items():
                            flattened_stats.append({
                                "event_id": event_id,
                                "event_name": event_name,
                                "map_name": mapname,
                                "opponent_id": opponent,
                                **stats
                            })
        team['event_stats'] = flattened_stats
    



        
def team():


    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    team_map_stats(map_data)
    team_match_stats(match_data)
    team_player_stats(player_data)

    showmatch_teams = [15315, 15805, 15316, 12065, 12066]
    for key, team in team_data.items():
        int_key = (int)(key)
        if int_key not in showmatch_teams:
            team_events_attended = [event['event_name'] for event in event_data if int_key in event['event_all_teams']]
            team_events_won = [event['event_name'] for event in event_data if int_key == event['event_winner']]
            team_best_placement = find_best_placement(int_key, event_data)

                    # can add team logo here
            if int_key in team_stats: # filter showmatches
                team_stats[int_key]['events_attended'] = team_events_attended
                team_stats[int_key]['events_won'] = team_events_won
                team_stats[int_key]['events_best_placements'] = team_best_placement
                team_stats[int_key]['region'] = team['team_region']
                team_stats[int_key]['id'] = int_key
            team_event_stats(int_key, event_data, player_data, map_data, match_data, team_data)



    team_stats_r = list(team_stats.values())
    flattenEventStats(team_stats_r)
    team_table_file = 'src/data/tables/team_table.json'
    with open(team_table_file, 'w') as file:
        json.dump(team_stats_r, file, indent=4)

team()








