import json
from datetime import datetime 

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
convert_prize_string_to_int()