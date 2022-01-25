'use strict';

import { v4 as uuidv4 } from 'uuid' ;

let users = [];

export function listContents(req, res) {
    /* Implementation Here */
    res.json({users: users});
    console.log("TEST");
}

function findUser(id) {
    // Find user in array, return index if found, return -1 if user does not exist
    for(let i=0; i<users.length; i++) {
        if(users[i].id.toString() === id.toString()) {
            console.log("yes maam");
            return i;
        }
    }
    return -1;

    // DR. DAN CODE
    // let foundUsers = users.filter(function(user){
    //     if(user.id === id){
    //         return true;
    //     }
    //     return false;
    // });
    // if(foundUsers.length > 0 ) {
    //     return foundUsers[0];
    // } else {
    //     return null;
    // }
}

export function findOne(req, res) {
    /* Implementation here */
    let index = findUser(req.body.id);

    if (index > 0) {
        res.json({user: users[index]});
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
}

export function createUser(req, res) {
    let id = uuidv4();
    let address = req.body.address;
    let name = req.body.name;
    let age = req.body.age;

    if(!age || typeof age !== 'number') {
        res.status(400);
        res.json({message:'age (number) invalid'})
    }

    if(!name || typeof name !== 'string') {
        res.status(400);
        res.json({message:'name (string) invalid'})
    }

    if(!address || typeof address !== 'string') {
        res.status(400);
        res.json({message:'address (string) invalid'})
    }

    let newUser = {
        id,
        name,
        age,
        address
    };

    users.push(newUser);
    res.status(201);
    res.json({users: newUser});
}

// Creates a new user or updates an existing user w/ the given id
export function updateUser(req, res){
    let id = req.body.id;
    let address = req.body.address;
    let name = req.body.name;
    let age = req.body.age;

    // QUESTION: is there a way to write a separate function that
    // can respond with a res.status(400) & res.json()?
    // or would there have to be a work-around (using null or numbers)?
    if(!age || typeof age !== 'number') {
        res.status(400);
        res.json({message:'age (number) invalid'})
    }

    if(!name || typeof name !== 'string') {
        res.status(400);
        res.json({message:'name (string) invalid'})
    }

    if(!address || typeof address !== 'string') {
        res.status(400);
        res.json({message:'address (string) invalid'})
    }

    let userIndex = findUser(id);

    if(userIndex >= 0) {
        users[userIndex].id = id;
        users[userIndex].age = age;
        users[userIndex].name = name;
        users[userIndex].address = address;
        console.log("update!");
        res.status(200);
        res.json({users: users[userIndex]});
    } else {
        // Create new user
        let newUser = {
            id,
            name,
            age,
            address
        };
        users.push(newUser);
        res.status(201);
        res.json({users: newUser});
    }
}

//
export function removeUser(req, res){
    let id = req.body.id;
    let userIndex = findUser(id);

    if(userIndex >= 0){
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}
