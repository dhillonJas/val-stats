// use Context Provider,
// calculate dynamically once and memo it
export const ALL = 'All'

export const Teams = [ALL, 'Gen.G', 'Sentinels', 'FunPlus Phoenix', 'Team Heretics', 'DRX', 'KRU Esports', 
                      'FNATIC', 'Bilibili Gaming', 'LEVIATAN', 'Talon Esports', 'Team Vitality', 
                      'Trace Esports', 'G2 Esports', 'Paper Rex', 'EDward Gaming', 'FUT Esports', 
                      'T1', 'Dragon Ranger Gaming', '100 Thieves', 'Karmine Corp', 'LOUD', 'Team Liquid', 
                      'Natus Vincere', 'Evil Geniuses', 'NRG Esports', 'ZETA DIVISION', 'Giants Gaming', 
                      'Attacking Soul Esports', 'KOI', 'DetonatioN FocusMe', 'BBL Esports', 'Cloud9', 
                      'MIBR', 'Team Secret', 'Global Esports', 'Rex Regum Qeon', 'FURIA', 'OpTic Gaming', 
                      'BOOM Esports', 'XSET', 'XERXIA Esports', 'NORTHEPTION', 
                      'Guild Esports', 'Ninjas In Pyjamas', 'The Guard', 'Vision Strikers', 
                      'FULL SENSE', 'Team Vikings', 'Crazy Raccoon', 'Gambit Esports', 'Envy', 
                      'X10 Esports', 'Acend', 'Keyd Stars', 'Papara SuperMassive', 'F4Q', 'Liberty', 
                      'Version1', 'Sharks Esports', 'NUTURN']
export const Regions = [
  ALL,
  'Americas', 
  'EMEA', 
  'APAC',
  'China'
]
export const Maps = [
    ALL,
    "Bind",
    "Haven",
    "Split",
    "Ascent",
    "Breeze",
    "Icebox",
    "Fracture",
    "Pearl",
    "Lotus",
    "Abyss"
  ];

  // should match the event_name in event_table.json
export const Events = [
    ALL,
    'Valorant Champions 2024',
    'Masters Shanghai 2024',
    'Masters Madrid 2024',
    'Valorant Champions 2023',
    'Masters Tokyo 2023',
    'Masters S\u00e3o Paulo LOCK//IN 2023',
    'Valorant Champions 2022',
    'Masters Copenhagen 2022',
    'Masters Reykjav\u00edk 2022',
    'Valorant Champions 2021',
    'Masters Berlin 2021',
    'Masters Reykjav\u00edk 2021',
]
  
export const Agents = {
                        Skye: 'Initiator',
                        Sova: 'Initiator',
                        Fade: 'Initiator',
                        Gekko: 'Initiator',
                        Kayo: 'Initiator',
                        Breach: 'Initiator',
                        Omen: 'Controller',
                        Harbor: 'Controller',
                        Brimstone: 'Controller',
                        Clove: 'Controller',
                        Astra: 'Controller',
                        Viper: 'Controller',
                        Reyna: 'Duelist',
                        Iso: 'Duelist',
                        Neon: 'Duelist',
                        Jett: 'Duelist',
                        Raze: 'Duelist',
                        Yoru: 'Duelist',
                        Phoenix: 'Duelist',
                        Chamber: 'Sentinel',
                        Deadlock: 'Sentinel',
                        Sage: 'Sentinel',
                        Killjoy: 'Sentinel',
                        Cypher: 'Sentinel',
}

export const Roles =
{
  Intiator: ['Skye', 'Breach', 'Fade', 'Sova', 'Gekko', 'Kayo'],  
  Controller: ['Clove', 'Omen', 'Brimstone', 'Harbor', 'Astra', 'Viper'], 
  Duelist: ['Neon', 'Jett', 'Raze', 'Yoru', 'Iso', 'Phoenix', 'Reyna'],
  Sentinel: ['Deadlock', 'Sage', 'Killjoy', 'Chamber', 'Cypher']
}