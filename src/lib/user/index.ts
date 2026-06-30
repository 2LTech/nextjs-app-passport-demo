/**
 * WARNING
 * This is just some demo functions, use a real database to create, store and get users
 */

import { pbkdf2Sync, randomBytes, randomUUID } from "crypto";

/**
 * User interface
 */
export interface User {
  id: string;
  createdAt: number;
  username: string;
  hash: string;
  salt: string;
}

// Users
const users: User[] = [];

/**
 * Create user
 * @param username Username
 * @param password Password
 */
const createUser = (username: string, password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1_000, 64, "sha512").toString("hex");
  const user = {
    id: randomUUID() as string,
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };
  users.push(user);
};

// Create a demo user
createUser("demo", "1234");

/**
 * Find user
 * @param body Body
 * @returns User
 */
export const findUser = async (body: {
  username: string;
}): Promise<User | undefined> => {
  return users.find((user) => user.username === body.username);
};

/**
 * Validate password
 * @param user User
 * @param body Body
 * @returns Validation
 */
export const validatePassword = async (
  user: User,
  body: { password: string },
): Promise<boolean> => {
  const hash = pbkdf2Sync(
    body.password,
    user.salt,
    1_000,
    64,
    "sha512",
  ).toString("hex");
  return hash === user.hash;
};
