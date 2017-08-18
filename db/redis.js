const redis = require('redis');

const client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function (err) {
console.log("Error " + err);
});
client.on("connect", () => console.log('connected to redis'));
// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.set('wub', 2);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies);


// client.quit();
// });



module.exports = client;