import { createClient, RedisClientType } from 'redis';

export const client: RedisClientType = createClient({
  url: 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD,
});

const connectRedis = async (): Promise<void> => {
  await client.connect();
  console.log('Successfully connected to Redis');
};

client.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});

export default connectRedis;
