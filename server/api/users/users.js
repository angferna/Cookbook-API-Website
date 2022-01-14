import uuidv4 from 'uuid/v4';

let users = [];

export function listContents(req, res) {
    /* Implementation Here */
    res.json({users});
}

export function findOne(req, res) {
    /* Implementation here */
    for(i=0; i<users.length; i++) {
        if(users[i] === req.params.id) {
            res.json({users: users[i]});
        }
    }
    res.status(404);
    res.json({message:'Not Found'});
}

export function createUser(req, res) {
    if(typeof req.body.name !== 'String' || typeof req.body.address !== 'String' || typeof req.body.age !== 'Number') {
        res.status(400);
        res.message({message: 'Invalid Request'})
    }

    var newUser = {
        name :req.body.name,
        address: req.body.name,
        age: req.body.age,
        id : uuidv4()
    };
    users.push(newUser);
    res.status(201);
    res.json({users: newUser});
}


