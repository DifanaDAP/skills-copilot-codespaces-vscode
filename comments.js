// Create web server

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/comments', function(req, res){
    fs.readFile('comments.json', 'utf8', function(err, data){
        res.send(data);
    });
});

app.post('/comments', function(req, res){
    fs.readFile('comments.json', 'utf8', function(err, data){
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err){
            res.send('Comment added');
        });
    });
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});