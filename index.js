var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'rwc2023'
});

var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/venues/", function(req,res){
	
	connection.query("SELECT * FROM venues", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.get("/teams/", function(req,res){
	
	connection.query("SELECT * FROM teams", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.get("/teams/A", function(req,res){
	
	connection.query("SELECT * FROM `pools` WHERE pool = 'A'", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.get("/teamPools", function(req,res){
	
	connection.query("SELECT * FROM teams JOIN pools ON teams.name = pools.team_name", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.get('/pool/:pool', function(req, res) {
  var pool = req.params.pool;
  connection.query('SELECT * FROM teams JOIN pools ON teams.name = pools.team_name WHERE pool = ?', [pool], function(error, results) {
      if (error) throw error;
      res.send(results);
  });
});


app.get("/players", function(req,res){
	
	connection.query("SELECT players.id AS player_id, players.name AS player_name, players.team_id AS player_team_id, teams.name AS team_name FROM players JOIN teams ON players.team_id = teams.id", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.get('/playerStatsPoints', function(req, res) {
	connection.query('SELECT pp.player_id, pp.player_name, pp.team_id, pp.points, pp.team_name, pt.tackles, pt.team_id, pt.team_name FROM player_points pp JOIN player_tackles pt ON pp.player_id = pt.player_id ORDER BY pp.points DESC;', function(error, results) {
		if (error) throw error;
		res.send(results);
	});
  });

  app.get('/playerStatsTackles', function(req, res) {
    connection.query('SELECT pp.player_id, pp.player_name, pp.team_id, pp.points, pp.team_name, pt.tackles, pt.team_id, pt.team_name FROM player_points pp JOIN player_tackles pt ON pp.player_id = pt.player_id ORDER BY pt.tackles DESC;', function(error, results) {
      if (error) throw error;
      res.send(results);
    });
    });



app.get("/results", function(req,res){
	
	connection.query("SELECT * FROM results JOIN venues ON results.venue_name = venues.name", function(err, rows, fields) {
		if (err) throw err;
  
		res.send(JSON.stringify(rows));
		
	  });
});

app.post("/updateScores", function(req, res){
    const { resultId, newTeam1Score, newTeam2Score } = req.body;

	connection.query("UPDATE results SET team1_score = ?, team2_score = ? WHERE match_id = ?", [newTeam1Score, newTeam2Score, resultId], function(err, result) {
        if (err) throw err;

        console.log("Scores updated successfully!");
        res.send("Scores updated successfully!");
    });
});

app.get("/resultsByDate/:date", function (req, res) {
    var formattedDate = req.params.date;

    connection.query(
        "SELECT * FROM results JOIN venues ON results.venue_name = venues.name WHERE results.date = ?",
        [formattedDate],
        function (err, rows, fields) {
            if (err) throw err;

            res.send(JSON.stringify(rows));
        }
    );
});

app.get('/results/:team', function(req, res) {
  var team = req.params.team;
  connection.query('SELECT * FROM results WHERE results.team1_name=? OR results.team2_name=?', [team, team], function(error, results) {
      if (error) throw error;
      res.send(results);
  });
});

var myServer = app.listen(3000, function() {
	console.log("Server listening on port 3000");
  });

