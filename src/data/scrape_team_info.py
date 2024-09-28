import requests
from bs4 import BeautifulSoup
import json
import traceback

team_table = {}

def handle_exception(e, function_name, url, additional_info={}):
    tb_str = traceback.format_exc()
    print(f"Error occurred at line number: {tb_str.splitlines()[-2]}")

    print(f"({function_name}) An error occurred while processing {url}: {e}")
    traceback.print_exc() 

    for key, value in additional_info.items():
        print(f"{key}: {value}") 
    exit()


def get_team_info(team_url):
    try:
        response = requests.get(team_url)
        soup = BeautifulSoup(response.text, 'html.parser')

        team_id = (int)(team_url.split('/')[-2]) 
        if team_id not in team_table:

            header = soup.find('div', class_='team-header')
            team_name = header.find('h1', class_='wf-title', style="display: inline-block;").text.strip()
            team_tag = header.find('h2', class_='wf-title team-header-tag')
            team_tag = team_tag.text.strip() if team_tag else team_name
            team_country = header.find('div', class_='team-header-country').text.strip()
            team_logo = header.find('div', class_='wf-avatar team-header-logo').find('img').get('src')
            # print("team_name, team_id, team_tag, team_country: ", team_name, team_id, team_tag, team_country)
            team_dic = {
                "team_name": team_name,
                "team_tag": team_tag,
                "team_logo": team_logo,
                "team_country": team_country,
                "team_region": "TBD"
            }

            team_table.update({team_id:team_dic})

    except Exception as e:
        handle_exception(e, 'get_team_info', team_url)

def get_team_url(match_url):
    response = requests.get(match_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract the first search result with team link
    team_link = soup.find_all('a', class_= 'match-header-link', href=True)
    if team_link:
        for team in team_link:
            team_url = "https://vlr.gg"+team['href']
            get_team_info(team_url)


def add_team_info():
    match_urls_file = 'src/data/match_urls.txt'
    with open(match_urls_file, 'r') as file:
        match_urls = [line.strip() for line in file.readlines()]

    for match_url in match_urls:
        get_team_url(match_url)

    with open('src/data/team_data.json', 'w') as json_file:
        json.dump(team_table, json_file, indent=4)


add_team_info()