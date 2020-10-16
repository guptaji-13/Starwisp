const { execFile } = require('child_process');
const redis = require('redis');

execFile(`Redis\\redis-server.exe `, (error, stdout) => {
  if (error) throw error;
  console.log(stdout);
});

const redisClient = redis.createClient();
module.exports.redisClient = redisClient;
// process.env.REDIS_URL

setInterval(function () {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (hours === 12 && minutes === 0) {
    redisClient.EXPIRE('tokenAM', 43200);
  } else if (hours === 0 && minutes === 0) {
    console.log(minutes);
    redisClient.EXPIRE('tokenPM', 43200);
  }
}, 10000);

redisClient.on('connect', () => {
  console.log('Redis client connected');
});
redisClient.on('error', error => {
  console.log('Redis not connected', error);
});
