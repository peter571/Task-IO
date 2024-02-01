import { Redis } from "ioredis";

abstract class SessionStore {
  abstract findSession(id: string): Promise<string>;
  abstract saveSession(id: string, session: any): void;
  abstract findAllSessions(): Promise<any[]>;
}

class InMemorySessionStore extends SessionStore {
  private sessions: Map<string, any>;

  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(id: string): any {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: any): void {
    this.sessions.set(id, session);
  }

  findAllSessions(): any {
    return Array.from(this.sessions.values());
  }
}

const SESSION_TTL = 24 * 60 * 60;
const mapSession = ([userID, connected]: any[]): any =>
  userID ? { userID, connected: connected === "true" } : undefined;

class RedisSessionStore extends SessionStore {
  private redisClient: Redis;

  constructor(redisClient: Redis) {
    super();
    this.redisClient = redisClient;
  }

  async findSession(id: string): Promise<any> {
    const result = await this.redisClient.hmget(
      `session:${id}`,
      "userID",
      "connected"
    );
    return mapSession(result);
  }

  saveSession(id: string, { userID, connected }: any): void {
    this.redisClient
      .multi()
      .hset(
        `session:${id}`,
        "userID",
        userID,
        "connected",
        connected
      )
      .expire(`session:${id}`, SESSION_TTL)
      .exec();
  }

  async findAllSessions(): Promise<any[]> {
    const keys = new Set<string>();
    let nextIndex = 0;
    do {
      const [nextIndexAsStr, results] = await this.redisClient.scan(
        nextIndex,
        "MATCH",
        "session:*",
        "COUNT",
        "100"
      );
      nextIndex = parseInt(nextIndexAsStr, 10);
      results.forEach((s: string) => keys.add(s));
    } while (nextIndex !== 0);
    const commands: any[] = [];
    keys.forEach((key: string) => {
      commands.push(["hmget", key, "userID", "connected"]);
    });
    const results = await this.redisClient.multi(commands).exec();
    return results ? results
      .map(([err, session]: any) =>
        err ? undefined : mapSession(session)
      )
      .filter((v: any) => !!v) : [];
  }
}

export { InMemorySessionStore, RedisSessionStore };
