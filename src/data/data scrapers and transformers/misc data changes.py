import json
from datetime import datetime 

def open_file(json_file_name):
    with open(json_file_name, 'r') as file:
        return json.load(file)
    
def add_region():
    team_data_file = 'src/data/team_data.json'
    with open(team_data_file, 'r') as file:
        team_data = json.load(file)

    americas = ['United States', 'Argentina','Chile', 'Brazil','Canada']
    apac = ['South Korea','Thailand','Singapore','Japan','Philippines','India','Indonesia',]
    china = ['China']
    emea = ['Europe', 'Turkey','Sweden','Russia']
    for key, value in team_data.items():
        if value['team_country'] in china:
            value['team_region'] = 'China'
        elif value['team_country'] in americas:
            value['team_region'] = 'Americas'
        elif value['team_country'] in apac:
            value['team_region'] = 'APAC'
        elif value['team_country'] in emea:
            value['team_region'] = 'EMEA'

    with open(team_data_file, 'w') as file:
        json.dump(team_data, file, indent=4)


# Event table had team names--> change to id to avoid confusion with teams
# that are in multiple regions (G2, FPX)
def change_team_name_to_id():
    event_data_file = 'src/data/event_data.json'
    with open(event_data_file, 'r') as file:
        event_data = json.load(file)

    team_data_file = 'src/data/team_data.json'
    with open(team_data_file, 'r') as file:
        team_data = json.load(file)

    
    name_to_id = {team_info['team_name']: team_id for team_id, team_info in team_data.items()}

    for event in event_data:
        all_team_arr = event['event_all_teams']
        new_team_id_arr = []
        for team in all_team_arr:
            if team not in ('G2 Esports', 'FunPlus Phoenix'):
                new_team_id_arr.append((int)(name_to_id[team]))
            else:
                new_team_id_arr.append(team)

        event['event_all_teams'] = new_team_id_arr   
        

        for key, teams in event['event_all_team_standings'].items():
            if isinstance(teams, str) and teams not in ('G2 Esports', 'FunPlus Phoenix'):
                event['event_all_team_standings'][key] = (int)(name_to_id[teams])
            elif isinstance(teams, list):
                new_arr = []
                for element in teams:
                    if element not in ('G2 Esports', 'FunPlus Phoenix'):
                        new_arr.append((int)(name_to_id[element]))
                    else:
                        new_arr.append(element)
                event['event_all_team_standings'][key] = new_arr
    
    

    with open(event_data_file, 'w') as file:
        json.dump(event_data, file, indent=4)



def convert_dates_to_ISO():
    event_data_file = 'src/data/event_data.json'
    with open(event_data_file, 'r') as file:
        event_data = json.load(file)
    
    for event in event_data:
        event_dates = event['event_dates'].split(' - ')
        event_start_date = event_dates[0]
        event_end_date = event_dates[1]

        start_date_obj = datetime.strptime(event_start_date, "%b %d %Y")
        end_date_obj = datetime.strptime(event_end_date, "%b %d %Y")

        start_iso = start_date_obj.isoformat()
        end_iso = end_date_obj.isoformat() 


        event.update({'event_start_date':start_iso})
        event.update({'event_end_date':end_iso})

        with open(event_data_file, 'w') as file:
            json.dump(event_data, file, indent=4)
    
def convert_prize_string_to_int():
    event_data_file = 'src/data/event_data.json'
    with open(event_data_file, 'r') as file:
        event_data = json.load(file)

    for event in event_data:
        event_prize = event['event_prize_pool'].replace(',','').replace('$','').replace(' USD','').strip()
        event_prize_int = int(event_prize)
        event['event_prize_pool'] = event_prize_int

    with open(event_data_file, 'w') as file:
        json.dump(event_data, file, indent=4)


def add_team_id_in_map():
    map_data = open_file('src/data/map_data.json')
    team_data = open_file('src/data/team_data.json')


    for map in map_data:
        map_winner_id = [(int)(key) for key, value in team_data.items() if map['map_winner'] == value['team_name']][0]
        map_loser_id = [(int)(key) for key, value in team_data.items() if map['map_loser'] == value['team_name']][0]

        map.update({"map_winner_id":map_winner_id})
        map.update({"map_loser_id":map_loser_id})
        
    with open('src/data/map_data.json', 'w') as file:
        json.dump(map_data, file, indent=4)

def add_team_id_in_match():
    match_data = open_file('src/data/match_data.json')
    team_data = open_file('src/data/team_data.json')

    for match in match_data:
        match_winner_id = [(int)(key) for key, value in team_data.items() if match['match_winner'] == value['team_name']]
        match_loser_id = [(int)(key) for key, value in team_data.items() if match['match_loser'] == value['team_name']]

        if match['match_winner'] in ('G2 Esports', 'FunPlus Phoenix'):
            if ('-2024-' in match['match_vlr_link']) or ('-2023-' in match['match_vlr_link']):
                match_winner_id = match_winner_id[0]
            else:
                match_winner_id = match_winner_id[1]
            match_loser_id = match_loser_id[0]
        elif match['match_loser'] in ('G2 Esports', 'FunPlus Phoenix'):
            if ('-2024-' in match['match_vlr_link']) or ('-2023-' in match['match_vlr_link']):
                match_loser_id = match_loser_id[0]
            else:
                match_loser_id = match_loser_id[1]
            match_winner_id = match_winner_id[0]

        else:
            match_winner_id = match_winner_id[0]
            match_loser_id = match_loser_id[0]

        match.update({"match_winner_id":match_winner_id})
        match.update({"match_loser_id":match_loser_id})
    with open('src/data/match_data.json', 'w') as file:
        json.dump(match_data, file, indent=4)


def add_team_id_to_player():
    team_data = open_file('src/data/team_data.json')
    player_data = open_file('src/data/player_data.json')
    map_data = open_file('src/data/map_data.json')

    maps_by_g2_amer = [map['map_id'] for map in map_data if map['map_winner_id'] == 11058 or map['map_loser_id'] == 11058]
    maps_by_g2_emea = [map['map_id'] for map in map_data if map['map_winner_id'] == 257 or map['map_loser_id'] == 257]
    maps_by_fpx_chn = [map['map_id'] for map in map_data if map['map_winner_id'] == 11328 or map['map_loser_id'] == 11328]
    maps_by_fpx_emea = [map['map_id'] for map in map_data if map['map_winner_id'] == 628 or map['map_loser_id'] == 628]
    maps_by_team_vks = [map['map_id'] for map in map_data if map['map_winner_id'] == 420 or map['map_loser_id'] == 420]
    maps_by_keyd_stars = [map['map_id'] for map in map_data if map['map_winner_id'] == 4894 or map['map_loser_id'] == 4894]
    
    for player in player_data:
        if player['player_team'] not in ('G2', 'FPX', 'VKS'):
            team_id = [key for key, value in team_data.items() if value['team_tag'] == player['player_team']]
            if len(team_id) > 1:
                print('something wrong')
                print(team_id)
                exit()
            
            team_id = (int)(team_id[0])
    
        elif player['player_map_id'] in maps_by_g2_amer:
            team_id = 11058
        elif player['player_map_id'] in maps_by_g2_emea:
            team_id = 257
        elif player['player_map_id'] in maps_by_fpx_chn:
            team_id = 11328
        elif player['player_map_id'] in maps_by_fpx_emea:
            team_id = 628
        elif player['player_map_id'] in maps_by_team_vks:
            team_id = 420
        elif player['player_map_id'] in maps_by_keyd_stars:
            team_id = 4894
        
        player.update({'player_team_id':team_id})

    with open('src/data/player_data.json', 'w') as file:
        json.dump(player_data, file, indent=4)


def test_kills_in_player():
    player_data = open_file('src/data/player_data.json')

    for player in player_data:
        if player['player_t_kills'] + player['player_ct_kills'] != player['player_both_kills']:
            print('found it')
            return player
    
    return "Nothing here"


def remove_key_team_table():
    team_table = open_file('src/data/tables/team_table.json')
    result = [list(item.values()) for item in team_table]

    team_table_file = 'src/data/tables/team_table.json'
    with open(team_table_file, 'w') as file:
        json.dump(result, file, indent=4)


def test_total_team_kills():
    player_data = open_file('src/data/player_data.json')

    total_kills = 0
    for player in player_data:
        if player['player_team_id'] == 2593:
            total_kills += player['player_both_kills']
    return total_kills

print(test_total_team_kills())