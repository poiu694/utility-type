import type { Remap } from "./re-map";
import type { User } from "./types";

export type SelectPartial<T, K extends keyof T> = {
  [P in K]?: T[P];
};

export type SetOptional<T, K extends keyof T> = Remap<
  Partial<Pick<T, K>> & Omit<T, K>
>;

type PartialName = SelectPartial<User, "name">;

const user: PartialName = {};

// Object literal may only specify known properties, and 'age' does not exist in type 'PartialName'
// const user2: PartialName = {
//   age: 1
// };

type OptionalName = SetOptional<User, "name">;

const user3: OptionalName = {
  age: 26,
  greeting: () => "",
  posts: () => [],
};
