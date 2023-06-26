import { Redis } from "ioredis";

abstract class MessageStore {
    abstract saveMessage(message: any): void;
    abstract findMessagesForUser(userID: string): Promise<any[]>;
  }
  
  class InMemoryMessageStore extends MessageStore {
    private messages: any[];
  
    constructor() {
      super();
      this.messages = [];
    }
  
    saveMessage(message: any) {
      this.messages.push(message);
    }
  
    async findMessagesForUser(userID: string) {
      return this.messages.filter(
        ({ from, to }: any) => from === userID || to === userID
      );
    }
  }
  
  const CONVERSATION_TTL = 24 * 60 * 60;
  
  class RedisMessageStore extends MessageStore {
    private redisClient: Redis;
  
    constructor(redisClient: Redis) {
      super();
      this.redisClient = redisClient;
    }
  
    saveMessage(message: any) {
      const value = JSON.stringify(message);
      this.redisClient
        .multi()
        .rpush(`messages:${message.from}`, value)
        .rpush(`messages:${message.to}`, value)
        .expire(`messages:${message.from}`, CONVERSATION_TTL)
        .expire(`messages:${message.to}`, CONVERSATION_TTL)
        .exec();
    }
  
    async findMessagesForUser(userID: string) {
      const results = await this.redisClient
        .lrange(`messages:${userID}`, 0, -1);
      return results.map((result) => JSON.parse(result));
    }
  }
  
  export { InMemoryMessageStore, RedisMessageStore };
  