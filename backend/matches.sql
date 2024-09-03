DROP TABLE IF EXISTS MATCHES;
CREATE TABLE matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamA TEXT,
  teamB TEXT,
  score TEXT
);

INSERT INTO matches (teamA, teamB, score) VALUES ('Team A', 'Team B', '13-7');
INSERT INTO matches (teamA, teamB, score) VALUES ('Team C', 'Team D', '8-13');
INSERT INTO matches (teamA, teamB, score) VALUES ('Team E', 'Team D', '8-13');
