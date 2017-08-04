// DEPENDENCIES
var bodyParser = require('body-parser');
var path = require('path');
var friendsTable = require('../data/friends.js');
var compatibleFriend = [];

// ROUTES
module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendsTable);
    });

    app.post("/api/friends", function(req, res) {
        var user = req.body;
        // console.log('before:',friendsTable);
        var newFriend = -1;
        var newFriendScore = 100;
        var currentFriendScore = 0;

        friendsTable.push(user); //push the new user in the friends array
        var userIndex = friendsTable.length - 1;
        var userUniqueId = user.name;// + userIndex;
        var allUsersScoresObj = {};

        // for (var i=0; i<friendsTable.length; i++) {
        //   var uniqueIdi = friendsTable[i].name + i;
        for (var j = 0; j < friendsTable.length; j++) {
            var allScores = [];
            
            // console.log(uniqueIdj)
            for (var x = 0; x < friendsTable[j].scores.length; x++) {
                
                var uniqueIdj = friendsTable[j].name;// + j;
                var score = Math.abs(user.scores[x] - friendsTable[j].scores[x]);
                // console.log(JSON.stringify(uniqueIdj + ':' + score));
                if (userUniqueId != uniqueIdj) {
                  allScores.push(score);
                }
            }
            // console.log(allScores);
            var totalScore = allScores[0] + allScores[1] + allScores[3] + allScores[4] + allScores[5] + allScores[6] + allScores[7] + allScores[8] + allScores[9];
            // console.log(uniqueIdj + totalScore);
            allUsersScoresObj[uniqueIdj] = totalScore;
        }
        // console.log(allUsersScoresObj);
        keysSorted = Object.keys(allUsersScoresObj).sort(function(a,b){return allUsersScoresObj[a]-allUsersScoresObj[b]})
        var matchedFriend = keysSorted[0];
        var matchedFriendIndx = 0;
        // console.log(keysSorted[0]);

        for (friend=0; friend<friendsTable.length; friend++) {
          if (matchedFriend === friendsTable[friend].name) {
            matchedFriendIndx = friend;
          }
        }

        newFriendDetails = friendsTable[matchedFriendIndx];
        // console.log(newFriendDetails);
        res.json(newFriendDetails);
        // console.log(res);

    });
};