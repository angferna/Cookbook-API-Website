db.towns.find({name:{$regex:/new/, $options: 'i'}}).pretty();

// {
//     "_id" : ObjectId("61fb26c77b38b30849c680f6"),
//     "name" : "New York",
//     "population" : 22200000,
//     "lastCensus" : ISODate("2016-07-01T00:00:00Z"),
//     "famousFor" : [
//     "the MOMA",
//     "food",
//     "Derek Jeter"
// ],
//     "mayor" : {
//     "name" : "Eric Adams",
//         "party" : "D"
// },
//     "state" : "NY",
//     "country" : DBRef("countries", "us")
// }
