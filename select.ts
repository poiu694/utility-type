import type { User } from "./types";

export type Select<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? K : never]: O[K];
};

const user: User = {
  name: "polee",
  age: 26,
  posts: () => ["post"],
  greeting: () => "greeting",
};

type UserStrings = Select<User, string>;
type UserNumbers = Select<User, number>;
type UserFunctions = Select<User, Function>;

const stringUser: UserStrings = {
  name: "lee",
};

const numberUser: UserNumbers = {
  age: 26,
};

const functionUser: UserFunctions = {
  posts: () => ["posts"],
  greeting: () => "",
};
