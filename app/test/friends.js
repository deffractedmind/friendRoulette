var pg = require("pg");
// Star Wars Characters (DATA)
// =============================================================
// var client = new pg.Client(conString);
var client = new pg.Client({
  user: "takszlouirgizb",
  password: "95308a6c28a0ac2f80c6323d1d79ca499c9191fd29da80abb94b9d225f12d67d",
  database: "df189s3f7p92an",
  port: 5432,
  host: "ec2-107-20-250-195.compute-1.amazonaws.com",
  ssl: true
})
client.connect();

var makeQuery = function(callback) {
    client.query("select row_to_json(friend) from friend", function(err, getFriends) {
        console.log(JSON.stringify(getFriends));
        // makeQuery(getFriends);
    });
}

// makeQuery();
module.exports.makeQuery = makeQuery();