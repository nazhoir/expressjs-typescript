interface User {
  id: number;
  username: string;
  password: string;
}

// Mock database
const users: User[] = [{ id: 1, username: 'testuser', password: 'testpass' }];

export const findUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

export const findUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};
