import json
import re
import copy
team_table = []
team_stats = {}

side_dict = {
    "attack":0,
    "defense":0,
    "overtime":0,
    "all":0
}
best_of_dic = {
    "Bo3":0,
    "Bo5":0,
    "all":0
}
stats_dic = {
    "team_name":'',
    "team_maps_won": 0,
    "team_maps_lost": 0,
    "team_map_picks_won": 0,
    "team_map_picks_lost": 0,
    "team_rounds_won": dict(side_dict),
    "team_rounds_lost": dict(side_dict),
    "team_matches_won": dict(best_of_dic),
    "team_matches_lost": dict(best_of_dic),
    "team_kills":dict(side_dict),
    "team_deaths":dict(side_dict),
    "team_assists":dict(side_dict),
    "team_diffs":dict(side_dict),
    "team_first_kills":dict(side_dict),
    "team_first_deaths":dict(side_dict)    
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
    
    return results

def team_map_stats(maps):


    for map in maps:
        if map['map_winner_id'] not in team_stats:
            team_stats.update({map['map_winner_id'] : copy.deepcopy(stats_dic)})
        if map['map_loser_id'] not in team_stats:
            team_stats.update({map['map_loser_id'] : copy.deepcopy(stats_dic)})

        team_stats[map['map_winner_id']]['team_name'] = map['map_winner']
        team_stats[map['map_loser_id']]['team_name'] = map['map_loser']
        team_stats[map['map_winner_id']]['team_maps_won'] += 1
        team_stats[map['map_loser_id']]['team_maps_lost'] += 1

        if map['map_pick'] == map['map_winner']:
            team_stats[map['map_winner_id']]['team_map_picks_won'] += 1
        if map['map_pick'] == map['map_loser']:
            team_stats[map['map_loser_id']]['team_map_picks_lost'] += 1

        team_stats[map['map_winner_id']]['team_rounds_won']['all'] += map['map_winner_score']
        team_stats[map['map_loser_id']]['team_rounds_lost']['all'] += map['map_loser_score']
       
        team_stats[map['map_winner_id']]['team_rounds_won']['attack'] += map['map_winner_attack_rounds']
        team_stats[map['map_loser_id']]['team_rounds_lost']['attack'] += map['map_lost_attack_rounds']
        
        team_stats[map['map_winner_id']]['team_rounds_won']['defense'] += map['map_winner_defense_rounds']
        team_stats[map['map_loser_id']]['team_rounds_lost']['defense'] += map['map_lost_defense_rounds']

        team_stats[map['map_winner_id']]['team_rounds_won']['overtime'] += map['map_winner_overtime_rounds']
        team_stats[map['map_loser_id']]['team_rounds_lost']['overtime'] += map['map_loser_overtime_rounds']

def team_match_stats(matches):
    for match in matches:
        team_stats[match['match_winner_id']]['team_matches_won']['all'] += 1
        team_stats[match['match_loser_id']]['team_matches_lost']['all'] += 1

        team_stats[match['match_winner_id']]['team_matches_won'][match['match_best_of']] += 1
        team_stats[match['match_loser_id']]['team_matches_lost'][match['match_best_of']] += 1
        
def team_player_stats(players):
    for player in players:
        team_stats[player['player_team_id']]['team_kills']['attack'] += player['player_t_kills']
        team_stats[player['player_team_id']]['team_kills']['defense'] += player['player_ct_kills']
        team_stats[player['player_team_id']]['team_kills']['all'] += player['player_both_kills']
        
        team_stats[player['player_team_id']]['team_deaths']['attack'] += player['player_t_deaths']
        team_stats[player['player_team_id']]['team_deaths']['defense'] += player['player_ct_deaths']
        team_stats[player['player_team_id']]['team_deaths']['all'] += player['player_both_deaths']
        
        team_stats[player['player_team_id']]['team_assists']['attack'] += player['player_t_assists']
        team_stats[player['player_team_id']]['team_assists']['defense'] += player['player_ct_assists']
        team_stats[player['player_team_id']]['team_assists']['all'] += player['player_both_assists']
        
        team_stats[player['player_team_id']]['team_diffs']['attack'] += (int)(player['player_t_diffs'])
        team_stats[player['player_team_id']]['team_diffs']['defense'] += (int)(player['player_ct_diffs'])
        team_stats[player['player_team_id']]['team_diffs']['all'] += (int)(player['player_both_diffs'])

        team_stats[player['player_team_id']]['team_first_kills']['attack'] += player['player_t_first_kills']
        team_stats[player['player_team_id']]['team_first_kills']['defense'] += player['player_ct_first_kills']
        team_stats[player['player_team_id']]['team_first_kills']['all'] += player['player_both_first_kills']

        team_stats[player['player_team_id']]['team_first_deaths']['attack'] += player['player_t_first_deaths']
        team_stats[player['player_team_id']]['team_first_deaths']['defense'] += player['player_ct_first_deaths']
        team_stats[player['player_team_id']]['team_first_deaths']['all'] += player['player_both_first_deaths']
        
        
        
        
def team():
    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    # for key, team in team_data.items():
    #     int_key = (int)(key)
        # team_name = team['team_name']
        # team_events_attended = [event['event_name'] for event in event_data if int_key in event['event_all_teams']]
        # team_events_won = [event['event_name'] for event in event_data if int_key == event['event_winner']]
        # team_best_placement = find_best_placement(int_key, event_data)



    team_map_stats(map_data)
    team_match_stats(match_data)
    team_player_stats(player_data)

    team_table_file = 'src/data/tables/team_table.json'
    with open(team_table_file, 'w') as file:
        json.dump([team_stats], file, indent=4)

team()
# print(team_stats)




