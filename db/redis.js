const redis = require('redis');

const client = redis.createClient();

var url = require('url');
var redisURL = url.parse(process.env.REDIS_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);
// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 

client.on("error", function (err) {
console.log("Error " + err);
});
client.on("connect", () => console.log('connected to redis'));

module.exports = client;