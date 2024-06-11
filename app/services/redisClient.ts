import { Redis } from "ioredis";
require("dotenv").config();

//creating instance
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
  password: process.env.REDIS_PASSWORD,
  retryStrategy(times) {
    if (times > 2) {
      return;
    }

    return Math.min(times * 50, 2000); // Delay in milliseconds
  },
});

export default redis;
