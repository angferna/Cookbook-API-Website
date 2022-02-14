map = function() {
    emit({
        longitude: Math.floor(this.location.longitude),
        name: this.components.name
    }, {
        count : 1
    });
}

reduce = function(key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return { count : total };
}

function reduce() {
    db.orders.mapReduce(
        map,
        reduce,
        { out: "map_reduce_example" }
    )

    return null;
}
