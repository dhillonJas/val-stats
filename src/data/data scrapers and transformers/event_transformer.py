import json

event_table = []

def open_file(json_file_name):
    with open(json_file_name, 'r') as file:
        return json.load(file)

def event_stats(event, match_data, map_data, player_data):

    def check_empty(dic, key):
        return dic[key] if isinstance(dic, dict) and dic else 0

    all_matches = [match_obj['match_id'] for match_obj in match_data if match_obj['match_event_id'] == event['event_id']]
    all_maps = [map_obj['map_id'] for map_obj in map_data if map_obj['map_match_id'] in all_matches]

    total_kills, total_deaths, total_assists, total_diffs = 0,0,0,0
    total_t_kills, total_t_deaths, total_t_assists, total_t_diffs = 0,0,0,0
    total_ct_kills, total_ct_deaths, total_ct_assists, total_ct_diffs = 0,0,0,0
    total_2k, total_3k, total_4k, total_5k = 0,0,0,0
    total_1v1, total_1v2, total_1v3, total_1v4, total_1v5 = 0,0,0,0,0

    total_stats_dic = {}
    for player_obj in player_data:
        if player_obj['player_map_id'] in all_maps:
            total_kills += player_obj['player_both_kills']
            total_deaths += player_obj['player_both_deaths']
            total_assists += player_obj['player_both_assists']
            total_diffs += (int)(player_obj['player_both_diffs'])

            total_t_kills += player_obj['player_t_kills']
            total_t_deaths += player_obj['player_t_deaths']
            total_t_assists += player_obj['player_t_assists']
            total_t_diffs += (int)(player_obj['player_t_diffs'])

            total_ct_kills += player_obj['player_ct_kills']
            total_ct_deaths += player_obj['player_ct_deaths']
            total_ct_assists += player_obj['player_ct_assists']
            total_ct_diffs += (int)(player_obj['player_ct_diffs'])

            total_2k += check_empty(player_obj['player_multis_clutches_stats'], '2k')
            total_3k += check_empty(player_obj['player_multis_clutches_stats'], '3k')
            total_4k += check_empty(player_obj['player_multis_clutches_stats'], '4k')
            total_5k += check_empty(player_obj['player_multis_clutches_stats'], '5k')

            total_1v1 += check_empty(player_obj['player_multis_clutches_stats'], '1v1')
            total_1v2 += check_empty(player_obj['player_multis_clutches_stats'], '1v2')
            total_1v3 += check_empty(player_obj['player_multis_clutches_stats'], '1v3')
            total_1v4 += check_empty(player_obj['player_multis_clutches_stats'], '1v4')
            total_1v5 += check_empty(player_obj['player_multis_clutches_stats'], '1v5')

    
    total_stats_dic.update({
        'event_kills':total_kills,
        'event_deaths':total_deaths,
        'event_assists':total_assists,
        'event_diffs':total_diffs,
        'event_t_kills':total_t_kills,
        'event_t_deaths':total_t_deaths,
        'event_t_assists':total_t_assists,
        'event_t_diffs':total_t_diffs,
        'event_ct_kills':total_ct_kills,
        'event_ct_deaths':total_ct_deaths,
        'event_ct_assists':total_ct_assists,
        'event_ct_diffs':total_ct_diffs,
        'event_maps_played':len(all_maps),
        'event_matches_played':len(all_matches),
        'event_2k':total_2k,
        'event_3k':total_3k,
        'event_4k':total_4k,
        'event_5k':total_5k,
        'event_1v1':total_1v1,
        'event_1v2':total_1v2,
        'event_1v3':total_1v3,
        'event_1v4':total_1v4,
        'event_1v5':total_1v5,
    })
    return total_stats_dic

def event():
    event_data = open_file('src/data/event_data.json')
    team_data = open_file('src/data/team_data.json')
    match_data = open_file('src/data/match_data.json')
    map_data = open_file('src/data/map_data.json')
    player_data = open_file('src/data/player_data.json')

    for event in event_data:
        
        winner_id = event['event_winner']
        winner_info = team_data[str(winner_id)]

        event_name = event['event_name']
        event_winner_name = winner_info['team_name']
        event_winner_region = winner_info['team_region']
        event_winner_country = winner_info['team_country']
        event_year = event['event_year']
        event_location = event['event_location']
        event_prize = event['event_prize_pool']
        event_total_teams = event['event_total_teams']
        event_start_date = event['event_start_date']
        event_end_date = event['event_end_date']
        event_link = event['event_vlr_link']

        all_teams = event['event_all_teams']
        event_all_teams = []

        for team_id in all_teams:
            team_info = team_data[str(team_id)]
            event_all_teams.append(team_info['team_name'])
        event_all_teams.sort()
        
        all_team_placements = event['event_all_team_standings']
        event_all_team_placements = {}

        for place, teams in all_team_placements.items():
            if isinstance(teams, int):
                team_info = team_data[str(teams)]
                event_all_team_placements.update({place:team_info['team_name']})
            elif isinstance(teams, list):
                placement_arr = []
                for team_id in teams:
                    team_info = team_data[str(team_id)]
                    placement_arr.append(team_info['team_name'])
                event_all_team_placements.update({place:placement_arr})
        

        event_all_stats = event_stats(event, match_data, map_data, player_data)
        event_dic = {
            'event_name': event_name,
            'event_winner_name': event_winner_name,
            'event_winner_region': event_winner_region,
            'event_winner_country': event_winner_country,
            'event_year': event_year,
            'event_location': event_location,
            'event_prize': event_prize,
            'event_total_teams': event_total_teams,
            'event_all_teams': event_all_teams,
            'event_team_placements':event_all_team_placements,
            'event_start_date': event_start_date,
            'event_end_date': event_end_date,
            'event_link': event_link
        }

        event_dic.update(event_all_stats)
        event_table.append(event_dic)

    event_table_file = 'src/data/tables/event_table.json'
    with open(event_table_file, 'w') as file:
        json.dump(event_table, file, indent=4)


event()