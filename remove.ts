import type { User } from "./types";

export type Remove<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
};

export type RemoveArray<T extends any[], U extends any[]> = U extends [
  infer _,
  ...infer UL
]
  ? T extends [infer _, ...infer TL]
    ? RemoveArray<TL, UL>
    : never
  : T;

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
