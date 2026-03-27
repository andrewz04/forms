const express = require("express");
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('User List');
}).post((req,res)=> {
    const firstName = req.body.firstName;
    const isValid = firstName !=="";
    if(isValid) {
        console.log(`Adding User: ${firstName}`);
        users.push({name: firstName});
        res.send("New User has been created");
    }
    else {
        console.log("Error adding user");
        res.render("user/new", {firstName: firstName});
        
    }
});

router.get('/new', (req,res)=> {
    res.render('user/new', {firstName: "Test"});
});

router.route('/:id').get((req,res) => {
    console.log(req.user);
    console.log("Getting user data");

    res.send(`Getting User data for id: ${req.user['name']}`);
}).delete((req ,res) => {
    res.send(`Deleting User data fro id: ${req.params.id}`);
}).put((req,res) => {
    res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [{name:"Bob"}, {name:"Joe"}];

router.param("id", (req, res, next, id) => {
    console.log("Access attempt by user: ",id);
    req.user = users[id];
    next();
});

module.exports = router;