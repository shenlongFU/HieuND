const express = require("express");
const app = express();
//const PlayerModel = require('./playerModel')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const GameModel = require('./models/playerModel');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
 });

 app.get("/game",(req,res)=>{
    res.sendFile(__dirname+'/public/table.html')
});

mongoose.connect('mongodb://localhost/scorekeeper',(err)=>{
    if(err) console.error(err);
    else console.log("Connect DB success! ");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/game/:id', (req, res) => {
    try {
        let gameId = req.params.id;
        console.log(gameId)
        if(gameId) {
            GameModel.findById(gameId, (err, gameFound) => {
                if(err) res.status(500).json({ success: 0, err: err })
                else res.json({ success: 1, game: gameFound });
            });
        } else res.json({ success: 0, err: "Missing parameter game id!" });
    } catch (error) {
        console.error(error);
    }
});
app.post('/game', (req, res) => {
    try {
        let newGame = req.body;
        console.log(newGame)
        GameModel.create(newGame, (err, newGameCreated) => {
            if(err) res.status(500).json({ success: 0, err: err })
            else res.json({ success: 1, game: newGameCreated });

        });
    } catch (error) {
        console.error(error);
    }
});

app.put('/game', (req, res) => {
    try {
        let gameId = req.body.gameId;
        console.log(gameId)
        if(gameId) {
            GameModel.findById(gameId, (err, gameFound) => {
                if(err) res.status(500).json({ success: 0, err: err })
                else if (gameFound) {
                    if(req.body.scores) {
                        gameFound.scores = req.body.scores;
                    } else gameFound.scores.push([ 0, 0, 0, 0 ]);

                    gameFound.save((err, gameUpdated) => {
                        if(err) res.status(500).json({ success: 0, err: err })
                        else res.json({ success: 1, game: gameUpdated });
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});



app.listen(8080,(err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is listening at port 8080");
    }
})