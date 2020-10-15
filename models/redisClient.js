const {execFile} = require('child_process');
const redis = require('redis');

execFile(`Redis\\redis-server.exe `,(error, stdout)=>{
    if(error) throw error;
    console.log(stdout);
  })

const redisClient = redis.createClient();
module.exports.redisClient = redisClient;
// process.env.REDIS_URL
redisClient.on('connect',()=>{
console.log('Redis client connected')
});
redisClient.on('error', (error)=>{
console.log('Redis not connected', error)
});