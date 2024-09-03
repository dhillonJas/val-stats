const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbFile = './my-database.db';
let dbExists = fs.existsSync(dbFile);

// if (!dbExists) 
    {
//   console.log('Database file does not exist. Setting up the database...');

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
      return;
    }
    console.log('Connected to the SQLite database.');
  });

  const initSQL = fs.readFileSync('matches.sql', 'utf-8');

  db.exec(initSQL, (err) => {
    if (err) {
      console.error('Error executing SQL:', err.message);
    } else {
      console.log('Database setup completed successfully.');
    }

    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Closed the database connection.');
      }
    });
  });
// } else {
//   console.log('Database file already exists. Skipping setup.');
}
