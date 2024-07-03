const express = require('express');
const mongoose = require('mongoose');
const User = require('./modules/face_it');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/./config.env` });
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '5000mb' }));
app.use(express.urlencoded({ extended: false, limit: "5000mb" }));

app.post('/', async (req, res)=>{
    
    try{
        let exists = [];
        let users = req.body.users;
        if(!users) return res.json({
            status:'ok',
            exists
        });
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            let checkUser = await User.findOne({ username: user });
            if(checkUser){
                exists.push(checkUser);
            }
        }
        res.json({
            status:'ok',
            exists
        });

    }catch(er){
        console.log(er.message);
    }
});

app.put('/',async (req, res)=>{
    
    try{
        var query = {username: req.query.username},
        update = { badge: req.query.badge },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
    
        // Find the document
        await User.findOneAndUpdate(query, update, options);
        res.json({
            status:'ok',
        });

    }catch(er){
        console.log(er.message);
    }
});
app.delete('/',async (req, res)=>{
    try{
        var query = { username: req.query.username };
        console.log(query);
        // Find the document
        await User.findOneAndDelete(query);
        res.json({
            status:'ok',
        });

    }catch(er){
        console.log(er.message);
    }
});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connectio => {
    console.log('connection to dataBase successful');
}).catch((er) => {
    console.log(er.message);
    console.log('bad auth/db');
});

app.listen(3001, ()=>{
    console.log('server live!');
});