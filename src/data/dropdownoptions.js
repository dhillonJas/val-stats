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


// change data in player_table to have keys as names, then use Object.keys(player_table)
// for options instead of this [same for team_table]
export const Players = ['2ge', 'AAAAY', 'Alfajer', 'allow', 'ANGE1', 'Anthem', 'AsLanM4shadoW', 'aspas', 'Asuna', 
                        'AtaKaptan', 'Autumn', 'AYRIN', 'Bazzi', 'BcJ', 'benjyfishy', 'Benkai', 'BerLIN', 'BerserX', 
                        'BeYN', 'BONECOLD', 'Boaster', 'Boo', 'BORKUM', 'Boostio', 'Brave', 'BuZz', 'bunt', 'Bunny', 
                        'C0M', 'Carpe', 'cauanzin', 'ceNder', 'CHICHOO', 'Chronicle', 'Cloud', 'Crws', 'Cryocells', 
                        'crow', 'cNed', 'cgrs', 'Crashies', 'd4v41', 'dapr', 'DaveeyS', 'deNaro', 'Demon1', 'Derialy', 
                        'Derke', 'Derrek', 'Destrian', 'dephh', 'd3ffo', 'dgzin', 'dimasick', 'Dispenser', 'DubsteP', 
                        'eeiu', 'Efina', 'EJAY', 'Emman', 'Enzo', 'Esperanza', 'f0rsakeN', 'Famouz', 'FengF', 
                        'FiNESSE', 'Fit1nho', 'fiveK', 'Flex1n', 'fl1pzjder', 'Flashback', 'foxy', 'Foxy9', 'fra', 
                        'frz', 'gaabxx', 'garnetS', 'gtn', 'H1ber', 'Haodong', 'heat', 'heybay', 'hfmi0dzjc9z7', 
                        'Hiko', 'hiro', 'Hoody', 'iZu', 'Izzy', 'jammyz', 'Jamppi', 'JessieVash', 'JhoW', 'Jinggg', 
                        'JitBoyS', 'Jonn', 'JohnOlsen', 'JonahP', 'JoXJo', 'jzz', 'Kai', 'Karon', 'Keloqz', 
                        'Khalil', 'Kicks', 'KiNgg', 'Kiles', 'Knight', 'koldamenta', 'krain', 'Kryptix', 'Lakia', 
                        'L1NK', 'LAMMYSNAX', 'Laz', 'leaf', 'Less', 'liazzi', 'Life', 'Lmemore', 'LuoK1ng', 
                        'Lysoar', 'MaKo', 'MAGNUM', 'makiba', 'Marved', 'marteen', 'mazin', 'Mazino', 'Meddo', 
                        'Medusa', 'MELser', 'Meteor', 'MINDfreak', 'MiniBoo', 'Mixwell', 'mitch', 'Molic', 'MOJJ', 
                        'Monk', 'Monyet', 'MrFaliN', 'mta', 'murizzz', 'Myssen', 'N4RRATE', 'NagZ', 'nAts', 'neth', 
                        'Newzera', 'Nicc', 'nitr0', 'nizhaoTZH', 'Nivera', 'nobody', 'Nukkye', 'nzr', 'pANcada', 
                        'paTiTek', 'Patiphan', 'penny', 'peri', 'primmie', 'Prozin', 'QutionerX', 'quick', 'qw1', 
                        'Rb', 'Redgar', 'reita', 'Rhyme', 'Rion', 'Rossy', 'Russ', 'Russell', 's0m', 'Sacy', 
                        'SantaGolf', 'Sayaplayer', 'Sayf', 'ScreaM', 'Secret', 'Seoldam', 'ShahZaM', 'Shiba', 'Shion', 
                        'Shyy', 'SicK', 'SkRossi', 'Solo', 'Something', 'SouhcNi', 'Sova', 'stax', 'steel', 'stellar', 
                        'SugarZ3ro', 'Suygetsu', 'Sweden', 'takej', 'tacos', 'T3xture', 't3xture', 'TenZ', 'TvirusLuke', 
                        'Turko', 'Vanity', 'vo0kashu', 'Wolfen', 'xand', 'xeta', 'XmjjKK', 'Xccurate', 'yuicaw', 'Zekken', 
                        'Zeek', 'Zest', 'Zyppan']
  
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