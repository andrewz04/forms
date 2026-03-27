const express = require("express");
const router = express.Router();

router.route('/').get((req, res)=> {
    res.send('User List');
}).post((req,res)=> {
    const firstName = req.body.firstName;
    const isValid = firstName !=="";
    if(isValid) {
        console.log(`Adding User: ${firstName}`);
        users.push({firstName});
        res.render("user/list", {users});
    }
    else {
        console.log("Error adding user");
        res.render("user/new", {firstName: firstName});
        
    }
});

router.get("list",(req,res) => {
    res.render("user/list", {users});
})

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

const users = [{firstName:"Bob"}, {firstName:"Joe"}];

router.param("id", (req, res, next, id) => {
    console.log("Access attempt by user: ",id);
    req.user = users[id];
    next();
});

module.exports = router;