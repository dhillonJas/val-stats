import json


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


change_team_name_to_id()
