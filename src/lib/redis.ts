import Redis from "ioredis";
import { env } from "../shared/config/env";

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

export default redis;
