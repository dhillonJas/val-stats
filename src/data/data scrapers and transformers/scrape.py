import requests
from bs4 import BeautifulSoup
import re 
from urllib.parse import urlparse, urlencode, urlunparse
import json
import traceback


VLR = 'https://vlr.gg'

event_urls_file = 'src/data/urls.txt'
# Open and read URLs from the file
with open(event_urls_file, 'r') as file:
    event_urls = [line.strip() for line in file.readlines()]

# map_urls_overview = []
# map_urls_performance = []
match_urls = []

player_table = []
map_table = []
match_table = []
event_table = []

def checkResponse(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print("(checkResponse) Failed to retrieve the page", url)
        exit()

# returns the id from the url based on the index
# 1 for match_id and map_id, 2 for event_id
def get_id(url, index):
    parsed_url = urlparse(url)
    return (int)(parsed_url.path.split('/')[index])

def handle_exception(e, function_name, url, additional_info={}):
    tb_str = traceback.format_exc()
    print(f"Error occurred at line number: {tb_str.splitlines()[-2]}")

    print(f"({function_name}) An error occurred while processing {url}: {e}")
    traceback.print_exc() 

    for key, value in additional_info.items():
        print(f"{key}: {value}") 
    exit()

def add_player_data_performance(match_performance_url):
    
    def add_performance_to_player_table(performance_dict, key_to_update, map_id):
        for key, value in performance_dict.items():
            filtered_players = [player for player in player_table if player["player_map_id"] == map_id and player["player_name"] == key]
            if len(filtered_players) == 0:
                return
            if len(filtered_players) > 1:
                print(f'(add_performance_to_player_table) duplicates found in player_table. More than one object with map_id: {map_id} and name:{key}')
                exit()
            filtered_players[0].get(key_to_update).update(value)

    try:
        html_content = checkResponse(match_performance_url)
        soup = BeautifulSoup(html_content, 'html.parser')
		
        stats_container_element = soup.find('div', class_='vm-stats-container')
        stats_game = stats_container_element.find_all('div', class_='vm-stats-game')
        
        for game in stats_game:
            map_id = game.get('data-game-id')
            if map_id != 'all':
                map_id = (int)(map_id)
                stats_game_children = game.find_all('div', recursive=False)
                if len(stats_game_children) > 1: #for 2 map series
                    head_to_head_table_element = stats_game_children[0].find('table', class_='mod-normal')

                    tr_elements = head_to_head_table_element.find_all('tr')

                    player_head_to_head = {}        
                    # for the names of one team
                    teamB_names_element = tr_elements[0].find_all('td')
                    teamB_names = []
                    for names_element in teamB_names_element:
                        team_name_element = names_element.find('div', class_='team')
                        if team_name_element:
                            name = team_name_element.find('div').contents[0].strip().replace('\t','').replace('\n','')
                            teamB_names.append(name)
                            player_head_to_head.update({name:{}})



                    # for other team's name and stats
                    for element in tr_elements[1:]:
                        td_elements = element.find_all('td')
                        name = None
                        for i, td_element in enumerate(td_elements):
                            if i == 0: #name
                                team_name_element = td_element.find('div', class_='team')
                                temp_name = team_name_element.find('div').contents[0].strip().replace('\t','').replace('\n','')
                                name = temp_name
                                player_head_to_head.update({name:{}})
                            else:
                                stats = td_element.text.strip().replace('\t','').replace('\n',' ')
                                stats_array = stats.split(' ')
                                stats_array = [(int)(element) for element in stats_array if element != '']
                                if len(stats_array) == 0:
                                    stats_array = [0,0,0]
                                if len(stats_array) < 3: #assuming the length is 2 here
                                    stats_array.append(stats_array[0] - stats_array[1])

                                player_head_to_head.get(name).update({teamB_names[i-1]:stats_array})

                                other_player_stats_array = [stats_array[1], stats_array[0], -stats_array[2]]
                                player_head_to_head.get(teamB_names[i-1]).update({name:other_player_stats_array})                   


                    header_row = ['name', 'agent', '2k', '3k', '4k', '5k', '1v1', '1v2', '1v3', '1v4', '1v5']
                    player_performance_stats = {}
                        
                    kills_stats_div = stats_game_children[1].find('table', class_='wf-table-inset mod-adv-stats')#.find('tbody')
                    kills_stats_tr_elements = kills_stats_div.find_all('tr', recursive=False)

                    for tr in kills_stats_tr_elements[1:]: #first tr is the header row
                        td_elements = tr.find_all('td')
                        for i,td in enumerate(td_elements[:-3]):
                            if i == 0:
                                team_name_element = td.find('div', class_='team')
                                name = team_name_element.find('div').contents[0].strip().replace('\t','').replace('\n','')
                                player_performance_stats.update({name:{}})
                            elif i > 1:
                                div_element = td.find('div', class_='stats-sq')
                                div_child_element = div_element.find(string=True, recursive=False)
                                if not div_child_element or not div_child_element.strip():
                                    stats_value = 0
                                else:
                                    stats_value = (int)(div_child_element)
                                player_performance_stats.get(name).update({header_row[i]:stats_value})

                    add_performance_to_player_table(player_head_to_head, 'player_head_to_head', map_id)
                    add_performance_to_player_table(player_performance_stats,'player_multis_clutches_stats', map_id)                           

    except Exception as e:
        handle_exception(e, 'add_player_data_performance', match_performance_url)


def add_player_data_overview(stats_table, map_id, match_url):

    # the first div contains the value for both sides stats, then attack sided stats, and then defense sided stats
    def get_att_def_stats(stats_element, cast_to='str'):
        cast_functions = {
        'int': int,
        'float': float,
        'str': str,
        }
         
        t_side_element = stats_element.find('span', class_='mod-t')
        ct_side_element = stats_element.find('span', class_='mod-ct')
        both_side_element = stats_element.find('span', class_='mod-both')

        t_side = t_side_element.text.strip() if t_side_element else 0
        ct_side = ct_side_element.text.strip() if ct_side_element else 0
        both_side = both_side_element.text.strip() if both_side_element else 0

        t_side = t_side if t_side else 0
        ct_side = ct_side if ct_side else 0
        both_side = both_side if both_side else 0

        try:
            t_side = cast_functions[cast_to](t_side)
            ct_side = cast_functions[cast_to](ct_side)
            both_side = cast_functions[cast_to](both_side)
            
        except Exception as e:
            handle_exception(e, 'add_player_data_overview -> get_att_def_stats', match_url)
        return both_side, t_side, ct_side

    try:
        for body in stats_table:
            tbody_element = body.find('tbody')
            tr_element = tbody_element.find_all('tr')

            for tr in tr_element:
                td_element = tr.find_all('td')
                player_name = td_element[0].find('div', class_='text-of').text.strip()
                player_team = td_element[0].find('div', class_='ge-text-light').text.strip()
                player_agent = td_element[1].find('span', class_='mod-agent').find('img').get('title')

                player_rating = td_element[2]
                player_both_rating, player_t_rating, player_ct_rating = get_att_def_stats(player_rating, 'float')

                player_acs = td_element[3]
                player_both_acs, player_t_acs, player_ct_acs = get_att_def_stats(player_acs, 'int')

                player_kills = td_element[4]
                player_both_kills, player_t_kills, player_ct_kills = get_att_def_stats(player_kills, 'int')
                
                player_deaths = td_element[5].find('span', style='margin: 0 4px;')
                player_both_deaths, player_t_deaths, player_ct_deaths = get_att_def_stats(player_deaths, 'int')

                player_assists = td_element[6]
                player_both_assists, player_t_assists, player_ct_assists = get_att_def_stats(player_assists, 'int')

                player_diffs = td_element[7]
                player_both_diffs, player_t_diffs, player_ct_diffs = get_att_def_stats(player_diffs)

                player_kast = td_element[8]
                player_both_kast, player_t_kast, player_ct_kast = get_att_def_stats(player_kast)

                player_adr = td_element[9]
                player_both_adr, player_t_adr, player_ct_adr = get_att_def_stats(player_adr, 'int')

                player_hsp = td_element[10]
                player_both_hsp, player_t_hsp, player_ct_hsp = get_att_def_stats(player_hsp)

                player_fk = td_element[11]
                player_both_first_kills, player_t_first_kills, player_ct_first_kills = get_att_def_stats(player_fk, 'int')

                player_fd = td_element[12]
                player_both_first_deaths, player_t_first_deaths, player_ct_first_deaths = get_att_def_stats(player_fd, 'int')



                player_dic = {
                    'player_map_id': map_id,
                    'player_team':player_team,
                    'player_name':player_name,
                    'player_agent':player_agent,

                    'player_t_rating':player_t_rating,
                    'player_ct_rating':player_ct_rating,
                    'player_both_rating':player_both_rating,

                    'player_t_acs':player_t_acs,
                    'player_ct_acs':player_ct_acs,
                    'player_both_acs':player_both_acs,

                    'player_t_kills': player_t_kills,
                    'player_ct_kills': player_ct_kills,
                    'player_both_kills': player_both_kills,
                    
                    'player_t_deaths': player_t_deaths,
                    'player_ct_deaths': player_ct_deaths,
                    'player_both_deaths': player_both_deaths,
                    
                    'player_t_assists': player_t_assists,
                    'player_ct_assists': player_ct_assists,
                    'player_both_assists': player_both_assists,
                    
                    'player_t_diffs': player_t_diffs,
                    'player_ct_diffs': player_ct_diffs,
                    'player_both_diffs': player_both_diffs,
                    
                    'player_t_kast': player_t_kast,
                    'player_ct_kast': player_ct_kast,
                    'player_both_kast': player_both_kast,
                    
                    'player_t_adr': player_t_adr,
                    'player_ct_adr': player_ct_adr,
                    'player_both_adr': player_both_adr,
                    
                    'player_t_hsp': player_t_hsp,
                    'player_ct_hsp': player_ct_hsp,
                    'player_both_hsp': player_both_hsp,
                    
                    'player_t_first_kills': player_t_first_kills,
                    'player_ct_first_kills': player_ct_first_kills,
                    'player_both_first_kills': player_both_first_kills,
                    
                    'player_t_first_deaths': player_t_first_deaths,
                    'player_ct_first_deaths': player_ct_first_deaths,
                    'player_both_first_deaths': player_both_first_deaths,

                    'player_head_to_head':{},
                    'player_multis_clutches_stats':{}
                }

                player_table.append(player_dic)

    except Exception as e:
        handle_exception(e, 'add_player_data_overview', match_url, additional_info={'map_id':map_id})



# give the vm-stats-container as parameter insetad of match_performance_url
def add_map_data(match_url, teamA, teamB, match_id):
    try:
        html_content = checkResponse(match_url)
        soup = BeautifulSoup(html_content, 'html.parser')
		
        stats_container_element = soup.find('div', class_='vm-stats-container')
        stats_game = stats_container_element.find_all('div', class_='vm-stats-game')
        
        for game in stats_game:
            map_id = game.get('data-game-id')
            if map_id != 'all':
                stats_container_element = game.find('div', class_='vm-stats-game-header')
                classmap_element = stats_container_element.find('div', class_='map')
                stats_container_element =game.find('div', class_='vm-stats-game-header')
                mappick_element = classmap_element.find('span', style='position: relative;')
                map_pick = 'Decider'
                pickA = mappick_element.find('span', class_='picked mod-1 ge-text-light')
                pickB = mappick_element.find('span', class_='picked mod-2 ge-text-light')
                map_pick = 'Decider'
                if pickA:
                	map_pick = teamA
                elif pickB:
                    map_pick = teamB

                map_id = (int)(map_id)
                map_name = mappick_element.text.strip().replace('\t', '').replace('PICK', '').replace('\n', '')
                
                #convert to minutes 
                map_duration = classmap_element.find('div', class_='map-duration').text.strip()
                
                team_element = stats_container_element.find_all('div', class_='team')              
                
                teamA_score = (int)(team_element[0].find('div', class_='score').text.strip())
                teamB_score = (int)(team_element[1].find('div', class_='score').text.strip())  

                teamA_t_rounds = int(team_element[0].find('span', class_='mod-t').text.strip())
                teamA_ct_rounds = int(team_element[0].find('span', class_='mod-ct').text.strip())
                teamA_ot_rounds = team_element[0].find('span', class_='mod-ot')
                teamA_ot_rounds = int(teamA_ot_rounds.text.strip()) if teamA_ot_rounds else 0

                teamB_t_rounds = int(team_element[1].find('span', class_='mod-t').text.strip())
                teamB_ct_rounds = int(team_element[1].find('span', class_='mod-ct').text.strip())
                teamB_ot_rounds = team_element[1].find('span', class_='mod-ot')
                teamB_ot_rounds = int(teamB_ot_rounds.text.strip()) if teamB_ot_rounds else 0

                map_winner_score = teamB_score
                map_loser_score = teamA_score
                map_winner = teamB
                map_loser = teamA

                map_winner_attack_rounds = teamB_t_rounds
                map_winner_defense_rounds = teamB_ct_rounds
                map_winner_overtime_rounds = teamB_ot_rounds
                map_lost_attack_rounds = teamA_t_rounds
                map_lost_defense_rounds = teamA_ct_rounds
                map_loser_overtime_rounds = teamA_ot_rounds
                if teamA_score > teamB_score:
                    map_winner_score = teamA_score
                    map_loser_score  = teamB_score
                    map_winner = teamA
                    map_loser = teamB
                    map_winner_attack_rounds = teamA_t_rounds
                    map_winner_defense_rounds = teamA_ct_rounds
                    map_winner_overtime_rounds = teamA_ot_rounds
                    map_lost_attack_rounds = teamB_t_rounds
                    map_lost_defense_rounds = teamB_ct_rounds
                    map_loser_overtime_rounds = teamB_ot_rounds
                                                                     
                map_total_attack_rounds_won = map_winner_attack_rounds + map_lost_attack_rounds
                map_total_defense_rounds_won = map_winner_defense_rounds + map_lost_defense_rounds
                map_vlr = match_url + '?game=' + str(map_id)

                map_dic = {
                    'map_id':map_id,
                    'map_match_id': match_id,
                    'map_name':map_name,
                    'map_pick':map_pick,
                    'map_duration':map_duration,
                    'map_winner':map_winner,
                    'map_loser':map_loser,
                    'map_winner_score':map_winner_score,
                    'map_loser_score':map_loser_score,
                    'map_winner_attack_rounds':map_winner_attack_rounds,
                    'map_winner_defense_rounds':map_winner_defense_rounds,
                    'map_winner_overtime_rounds':map_winner_overtime_rounds,
                    'map_loser_attack_rounds':map_lost_attack_rounds,
                    'map_loser_defense_rounds':map_lost_defense_rounds,
                    'map_loser_overtime_rounds':map_loser_overtime_rounds,
                    'map_total_attack_rounds_won':map_total_attack_rounds_won,
                    'map_total_defense_rounds_won':map_total_defense_rounds_won,
                    'map_timeline':'TBD',
                    'map_vlr_link': map_vlr
                }

                map_table.append(map_dic)

                stats_tables = game.find_all('table', class_='wf-table-inset mod-overview')
                add_player_data_overview(stats_tables, map_id, match_url)

    except Exception as e:
        handle_exception(e, 'add_map_data', match_url)

# adds all the urls for every match in the given match page url
def get_all_matches_urls(match_page_url):
    try:
        html_content = checkResponse(match_page_url)
        soup = BeautifulSoup(html_content, 'html.parser')

        matches_elements = soup.find_all('a', class_='wf-module-item')
        urls = []
        for match in matches_elements:
            match_url = VLR + match.get('href')
            urls.append(match_url)
        return urls
    except Exception as e:
        handle_exception(e, 'insert_all_matches_urls', match_page_url)

# gets the Match page url that have a list of all matches from event url
def get_matches_page_url(event_url):
    parsed_url = urlparse(event_url)
    new_path = f"/event/matches{parsed_url.path[6:]}"  # Insert 'matches' after 'event'
    query_params = {'series_id': 'all', 'group': 'all'}
    query_string = urlencode(query_params)
    return urlunparse((parsed_url.scheme, parsed_url.netloc, new_path, '', query_string, ''))

def add_match_data(match_url, eventid):

    try:
        html_content = checkResponse(match_url)
        soup = BeautifulSoup(html_content, 'html.parser')

        header_element = soup.find('div', class_='match-header-vs')
        teams_element = header_element.find_all('div', class_='wf-title-med')

        score_regex = re.compile(r'^match-header-vs-score-')

        first_scores_div = header_element.find('div', class_='match-header-vs-score')
        scores_divs = first_scores_div.find('div', class_='match-header-vs-score')
        scores_spans = scores_divs.find_all('span', class_=score_regex)

        scores_array = []
        for span in scores_spans:
            scores_array.append(span.text.strip())


        #best of
        bo_element = first_scores_div.find_all('div', class_='match-header-vs-note')[1]
        match_BO = bo_element.text.strip()

        teamA = teams_element[0].text.strip()
        teamB = teams_element[1].text.strip()
        teamA_score = scores_array[0]
        teamB_score = scores_array[2]

        match_id = get_id(match_url, 1)
        match_winner_team = teamA
        match_loser_team = teamB
        match_winner_score = teamA_score
        match_loser_score = teamB_score
        if teamA_score < teamB_score:
            match_winner_team = teamB
            match_loser_team = teamA
            match_winner_score = teamB_score
            match_loser_score = teamA_score


        #date
        header_super = soup.find('div', class_='match-header-super')
        date_header_element = header_super.find('div', class_='match-header-date')
        match_utc_date = date_header_element.find('div', class_='moment-tz-convert').get('data-utc-ts')

        #stage
        match_stage = header_super.find('div', class_='match-header-event-series').text.strip()
        match_stage = match_stage.replace('\t', '').replace('\n', '')

        if 'Showmatch' not in match_stage:
            match_dic = {
                'match_id':match_id,
                'match_event_id':eventid,
                'match_winner':match_winner_team,
                'match_loser':match_loser_team,
                'match_winner_score':match_winner_score,
                'match_loser_score':match_loser_score,
                'match_best_of':match_BO,
                'match_winner_attack_rounds':'TBD',
                'match_winner_defense_rounds':'TBD',
                'match_loser_attack_rounds':'TBD',
                'match_loser_attack_rounds':'TBD',
                'match_attack_rounds_won':'TBD',
                'match_defense_rounds_won':'TBD',
                'match_date_utc':match_utc_date,
                'match_stage':match_stage,
                'match_vlr_link':match_url
            }

            match_table.append(match_dic)
            return teamA, teamB, match_id
        else:
            return None, None, None
        
    except Exception as e:
        handle_exception(e, 'add_match_data', match_url)

def add_event_data(event_url, event_id):
    try:
        html_content = checkResponse(event_url)
        soup = BeautifulSoup(html_content, 'html.parser')

        desc_element = soup.find('div', class_='event-desc-inner')
        event_title = desc_element.find('h1', class_='wf-title').text.strip()

        desc_items_element = desc_element.find_all('div', class_='event-desc-item-value')

        event_dates = desc_items_element[0].text.strip()
        event_prize_pool = desc_items_element[1].text.strip()
        event_location = desc_items_element[2].text.strip()

        event_dic = {
           'event_id': event_id,
           'event_title':event_title,
           'event_location':event_location,
           'event_year':(int)(event_dates[-4:]),
           'event_dates':event_dates,
           'event_prize_pool':event_prize_pool,
           'event_winner':'TBD',
           'event_grand_finalist':'TBD',
           'event_total_teams':'TBD',
           'event_all_teams':'TBD',
           'event_all_team_standings':'TBD',
           'event_vlr_link':event_url
        }

        event_table.append(event_dic)

    except Exception as e:
        handle_exception(e, 'add_event_data', event_url)


def main():
    for event_url in event_urls:
        event_id = get_id(event_url, 2)
        add_event_data(event_url, event_id)

        matches_page_url = get_matches_page_url(event_url)
        all_matches_for_this_event = get_all_matches_urls(matches_page_url)
        match_urls.extend(all_matches_for_this_event)
        for match_url in all_matches_for_this_event:
            teamA, teamB, match_id = add_match_data(match_url, event_id)
            performance_url = match_url + '/?game=all&tab=performance'
            if teamA and teamB and match_id: #filter out any showmatch
                add_map_data(match_url, teamA, teamB, match_id)
                add_player_data_performance(performance_url)

    with open('src/data/output/output_match_urls.txt', 'w') as file:
        file.write('\n'.join(map(str, match_urls)))

    with open('src/data/output/event_data.json', 'w') as json_file:
        json.dump(event_table, json_file, indent=4)

    with open('src/data/output/match_data.json', 'w') as json_file:
        json.dump(match_table, json_file, indent=4)

    with open('src/data/output/map_data.json', 'w') as json_file:
        json.dump(map_table, json_file, indent=4)

    with open('src/data/output/player_data.json', 'w') as json_file:
        json.dump(player_table, json_file, indent=4)

main()