class SocketUsers {
  users: Array<string>;

  constructor() {
    this.users = [];
  }

  addUser(id: string) {
    if (this.users.length > 0) {
      if (this.users.some((user) => user === id)) {
        return;
      }
    }
    this.users.push(id);
  }

  removeUser(id: string) {
    this.users = this.users.filter((user) => user !== id);
  }

  getUsers() {
    return this.users;
  }
}

export const users = new SocketUsers();
