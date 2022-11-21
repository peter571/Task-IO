interface Session {
  userID: string;
  connected: boolean;
}

/**Abstract */
class SessionStore {
  findSession(id: string) {}
  saveSession(id: string, session: Session) {}
  findAllSessions() {}
}

export class InMemorySessionStore extends SessionStore {
  sessions: Map<any, any>;

  constructor() {
    super();
    this.sessions = new Map();
  }

  findSession(id: string) {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: Session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}
