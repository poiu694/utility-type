export type Trim<T> = T extends ` ${infer Rest}`
  ? Trim<Rest>
  : T extends `${infer Rest} `
  ? Trim<Rest>
  : T;

const key = "       key        ";
type Key = typeof key; //  "       key        "
type TrimKey = Trim<typeof key>; // "key"
