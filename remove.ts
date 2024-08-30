import type { User } from "./types";

export type Remove<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
};

type SerializableUser = Remove<User, Function>;

const user: User = {
  name: "polee",
  age: 26,
  posts: () => ["post"],
  greeting: () => "greeting",
};

const serializableUser: SerializableUser = {
  name: "lee",
  age: 26,
};
