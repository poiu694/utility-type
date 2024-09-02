import { Remap } from "./re-map";
import { User } from "./types";

export type OnlyRequired<T, Key extends keyof T = keyof T> = Remap<
  Required<Pick<T, Key>> & Partial<Omit<T, Key>>
>;

type OnlyRequiredName = OnlyRequired<User, "name">;

const user: OnlyRequiredName = {
  name: "",
};
