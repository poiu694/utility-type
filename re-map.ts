import { User } from "./types";

export type Remap<T> = {
  [Key in keyof T]: T[Key];
};

type OnlyRequired1<T, Key extends keyof T> = Required<Pick<T, Key>> &
  Partial<Omit<T, Key>>;

// type OnlyRequiredUserName1 = Required<Pick<User, "name">> & Partial<Omit<User, "name">>
type OnlyRequiredUserName1 = OnlyRequired1<User, "name">;

// type OnlyRequiredUserName2 = {
//    name: string;
//    age?: number | undefined;
//    profession?: string | undefined;
//    posts?: (() => string[]) | undefined;
//    greeting?: (() => string) | undefined;
// }
type OnlyRequiredUserName2 = Remap<OnlyRequired1<User, "name">>;
