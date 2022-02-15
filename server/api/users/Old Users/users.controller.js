'use strict';

import { v4 as uuidv4 } from 'uuid' ;
import User from './users.model';
// let users = [];


export function index(req, res) {
    /* Implementation Here */
    res.json({users: User.find()});
}

// function findUser(id) {
//     // Find user in array, return index if found, return -1 if user does not exist
//     for(let i=0; i<users.length; i++) {
//         if(users[i].id.toString() === id.toString()) {
//             return i;
//         }
//     }
//     return -1;
//
//     // DR. DAN CODE
//     // let foundUsers = usersController.filter(function(user){
//     //     if(user.id === id){
//     //         return true;
//     //     }
//     //     return false;
//     // });
//     // if(foundUsers.length > 0 ) {
//     //     return foundUsers[0];
//     // } else {
//     //     return null;
//     // }
// }

export function show(req, res) {
    /* Implementation here */
    console.log("CONTROLLER ID VAL" + req.body.id);
    let user = User.findById(req.params.id);

    if (user !== null) {
        res.json({users: user});
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
}

export function create(req, res) {

    let name = req.body.name;
    let age = req.body.age;
    let address = req.body.address;

    // Type checking
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

    let user = {
        name,
        age,
        address,
    };

   user = User.create(user);
   res.status(201);
   res.json({users: user});
}

// Creates a new user or updates an existing user w/ the given id
export function upsert(req, res){
    let id = req.params.id;
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

    let user = {
        id,
        name,
        age,
        address
    };

    let updated = User.findOneAndUpdate(user);

    if(updated) {
        res.status(200);
        res.json({users: user});
    } else {
        res.status(201);
        res.json({users: user});
    }
}


export function destroy(req, res){
    let id = req.params.id;

    let destroyed = User.remove(id);

    if(destroyed){
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}
