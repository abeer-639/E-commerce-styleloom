import { MockUser } from "./types";

export const users: MockUser[] = [
  { id: "u1", name: "Admin User", email: "admin@demo.com", password: "admin123", role: "admin" },
  { id: "u2", name: "Sara Ahmad", email: "sara@demo.com", password: "user123", role: "user" },
  { id: "u3", name: "Omar Khaled", email: "omar@demo.com", password: "user123", role: "user" },
];

export function findUserByCredentials(email: string, password: string): MockUser | undefined {
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}

export function getUserById(id: string): MockUser | undefined {
  return users.find((u) => u.id === id);
}

export function emailExists(email: string): boolean {
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

let nextId = users.length + 1;


export function registerMockUser(name: string, email: string, password: string): MockUser {
  const user: MockUser = { id: `u${nextId++}`, name, email, password, role: "user" };
  users.push(user);
  return user;
}
