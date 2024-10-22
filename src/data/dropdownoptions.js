// use Context Provider,
// calculate dynamically once and memo it
export const Teams = ['All', 'Gen.G', 'Sentinels', 'FunPlus Phoenix', 'Team Heretics', 'DRX', 'KRU Esports', 
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
  'All',
  'Americas', 
  'EMEA', 
  'APAC',
  'China'
]
export const Maps = [
    "All",
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
    'All',
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
export const Players = ['kiNgg', 'MrFaliN', 'Wolfen', 'Nivera', 'jzz', 'Russ', 'SantaGolf', 'valyn', 
                        'TS', 'whzy', 'eeiu', 'N4RRATE', 'TvirusLuke', 'SicK', 'FiNESSE', 'vo0kashu', 
                        'Mixwell', 'Derialy', 'EJAY', 'Demon1', 'MOJJ', 'trent', 't3xture', 'Fisker', 
                        'Sayaplayer', 'Boaster', 'ZmjjKK', 'BerLIN', 'xccurate', 'NagZ', 'MaKo', 
                        'Lysoar', 'Flex1n', 'frz', 'delz1k', 'Hiko', 'Patiphan', 'sheydos', 'trexx', 
                        'Secret', 'russ', 'aspas', 'Benkai', 'xand', 'vanity', 'prozin', 'cNed', 
                        'FengF', 'MiniBoo', 'mazin', 'd3ffo', 'mwzera', 'Zyppan', 'heat', 'ban', 
                        'monk', 'AAAAY', 'MAGNUM', 'Cloud', 'L1NK', 'Emman', 'liazzi', 'Anthem', 
                        'allow', 'mta', 'zunba', 'Crws', 'xeta', 'PTC', 'nitr0', 'Wo0t', 'Nicc', 
                        'Cryocells', 'BcJ', 'fiveK', 'Smoggy', 'tomaszy', 'RieNs', 'Sayf', 'zombs', 
                        'DubsteP', 'barce', 'Newzera', 'garnetS', 'murizzz', 'iZu', 'Xeppaa', 'BerserX', 
                        'AtaKaptan', 'nukkye', 'Sushiboys', 'JohnOlsen', 'Biank', 'axeddy', 'Munchkin', 
                        'zepher', 'Kai', 'JoXJo', 'Bazzi', 'tex', 'yay', 'SuperBusS', 'Myssen', 'ntk', 
                        'Jamppi', 'ardiis', 'rion', 'ANGE1', 'DaveeyS', 'BONECOLD', 'tuyz', 'Foxy9', 
                        'Shion7', 'xffero', 'neth', 'solo', 'gaabxx', 'marteen', 'CHICHOO', 'zeek', 
                        'Izzy', 'pleets', 'Haodong', 'Fit1nho', 'Sacy', 's0m', 'foxz', 'Jremy', 
                        'Twisten', 'JonahP', 'hiro', 'Ethan', 'Marved', 'JessieVash', 'Kiles', 
                        'Monyet', 'Turko', 'starxo', 'neT', 'saadhak', 'deNaro', 'nephh', 'Famouz', 
                        'Asuna', 'Zest', 'doma', 'AsLanM4shadoW', 'Esperanza', 'nzr', 'BeYN', 
                        'LuoK1ng', 'Boostio', 'zekken', 'BORKUM', 'stax', 'runneR', 'bezn1', 
                        'ScreaM', 'Less', 'koldamenta', 'mitch', 'Medusa', 'Autumn', 'nobody', 
                        'sh1n', 'icy', 'k1Ng', 'hoody', 'Rossy', 'Carpe', 'qw1', 'crashies', 
                        'crow', 'Mistic', 'Will', 'Klaus', 'dimasick', 'shiba', 'Shyy', 'Efina', 
                        'dapr', 'Kicks', 'Zellsis', 'Kryptix', 'xnfri', 'Yuicaw', 'Seoldam', 
                        'keloqz', 'Brave', 'SEIDER', 'Yosemite', 'MOLSI', 'peri', 'jawgemo', 
                        'Rb', 'Surf', 'cauanzin', 'Flashback', 'soulcas', 'Khalil', 'Jonn', 
                        'Victor', 'Reita', '2ge', 'Lmemore', 'Derrek', 'Chronicle', 'YuChEn', 
                        'SUYGETSU', 'gtn', 'Quick', 'eKo', 'Knight', 'QutionerX', 'Witz', 
                        'benjyfishy', 'steel', 'dephh', 'H1ber', 'Jinggg', 'bunt', 'Enzo', 
                        'bnj', 'xms', 'Bunny', 'TenZ', 'Melser', 'something', 'jammyz', 
                        'effys', 'Leo', 'sutecas', 'YHchen', 'stellar', 'fl1pzjder', 'invy', 'AvovA', 
                        'pANcada', 'fra', 'ade', 'Governor', 'rin', 'TENNN', 'shion', 'rhyme', 
                        'BlackWiz', 'mindfreak', 'takej', 'dispenser', 'AYRIN', 'BuZz', 'Lakia', 
                        'leaf', 'Shao', 'makiba', 'yetujey', 'Meteor', 'light', 'Dep', 'C0M', 
                        'nAts', 'Meddo', 'Destrian', 'f0rsakeN', 'Karon', 'nizhaoTZH', 'S1Mon', 
                        'RgLMeister', 'dgzin', 'Life', 'LAMMYSNAX', 'ShahZaM', 'JhoW', 'Boo', 
                        'Mazino', 'heybay', 'krain', 'Redgar', 'Laz', 'd4v41', 'pAura', 'v1xen', 
                        'primmie', 'adverso', 'qRaxs', 'keznit', 'JitBoyS', 'Suggest', 'ceNder', 
                        'Alfajer', 'cgrs', 'sScary', 'hfmi0dzjc9z7', 'paTiTek', 'SkRossi', 'penny', 
                        'SugarZ3ro', 'Derke', 'SouhcNi', 'bang', 'blaZek1ng', 'johnqt', 'Tacolilla']

export const Agents = ['All','Neon', 'Deadlock', 'Sage', 'Killjoy', 'Skye', 'Clove', 'Omen', 'Breach', 
                      'Brimstone', 'Harbor', 'Jett', 'Astra', 'Raze', 'Chamber', 'Cypher', 'Fade', 
                      'Yoru', 'Iso', 'Viper', 'Sova', 'Phoenix', 'Gekko', 'Reyna', 'Kayo']