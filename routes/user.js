const express = require("express");
const router = express.Router();

router.route('/').get((req, res)=> {
    res.send('User List');
}).post((req,res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = req.body.age;

    const isValid = firstName && lastName && gender && age !=="";
    if(isValid) {
        const id = users.length - 1;

        console.log(`Adding User: ${firstName}`);
        console.log(`Gender: ${gender}`);
        console.log(`Age:${age}`);
        console.log(`Assigning ID: ${id}`);
        users.push({firstName, lastName, gender, age, id});
        
        res.render("user/list", {users});
    }
    else {
        console.log("Error adding user");   
        res.render('user/new', {firstName: "First Name", lastName: "Last Name", age: 1});
        
    }
});

router.get("/list",(req,res) => {
    res.render("user/list", {users});
})

router.get('/new', (req,res)=> {
    res.render('user/new', {firstName: "First Name", lastName: "Last Name", age: 1});
});

router.route('/:id').get((req,res) => {
    console.log(req.user);
    console.log("Getting user data");

    res.send(`Getting User data for id: ${req.user.firstName} <br>
        Gender: ${req.user.gender} <br>
        Age: ${req.user.age}`);
    
}).delete((req ,res) => {
    res.send(`Deleting User data fro id: ${req.params.id}`);
}).put((req,res) => {
    res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [{firstName:"Bob", lastName: "Doe", gender: "Male", age: 18, id: 0}, 
    {firstName:"Joe", lastName: "Johnson", gender: "Male", age: 20, id: 1}];

router.param("id", (req, res, next, id) => {
    console.log("Access attempt by user: ",id);
    
    req.user = users[id];
    next();
});

module.exports = router;