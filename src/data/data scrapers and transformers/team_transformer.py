import json
import re
team_table = []

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
    team_map_stats_dic = {}
    stats_dic = {
        "team_maps_won": 0,
        "team_maps_lost": 0,
        "team_map_picks_won": 0,
        "team_map_picks_lost": 0
    }

    for map in maps:
        if map['map_winner'] not in team_map_stats_dic:
            team_map_stats_dic.update({map['map_winner'] : dict(stats_dic)})
        if map['map_loser'] not in team_map_stats_dic:
            team_map_stats_dic.update({map['map_loser'] : dict(stats_dic)})
      
        

def team():
    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    for key, team in team_data.items():
        int_key = (int)(key)
        team_name = team['team_name']
        team_events_attended = [event['event_name'] for event in event_data if int_key in event['event_all_teams']]
        team_events_won = [event['event_name'] for event in event_data if int_key == event['event_winner']]
        team_best_placement = find_best_placement(int_key, event_data)

        team_maps_won, team_maps_lost = 0,0
        team_map_picks_won, team_map_picks_lost = 0,0

        




        print(team_name, team_best_placement)

team()