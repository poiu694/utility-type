export type FormatBracketKeys<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | FormatBracketKeys<Rest>
    : never;

type A = FormatBracketKeys<"Hello World!">; // never
type B = FormatBracketKeys<"Hello World!, {polee}">; // polee
type C = FormatBracketKeys<"Hello World!, {po}{lee}">; // po | lee

function format<T extends string, K extends Record<FormatBracketKeys<T>, any>>(
  originalString: T,
  params: K
): string {
  let result: string = originalString;

  for (let key in params) {
    result = result.replace(`{${key}}`, params[key]);
  }

  return result;
}

const original = "Hello World!, {po}{lee}";
const formattedString = format(original, { po: "sang", lee: "min" }); // Hello World!, sangmin

type MapFormatType = {
  string: string;
  number: number;
  boolean: boolean;
  [x: string]: any;
};

export type FormatObject<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key extends `${infer KeyPart}:${infer TypePart}`
      ? { [K in KeyPart]: MapFormatType[TypePart] } & FormatObject<Rest>
      : { [K in Key]: { toString(): string } } & FormatObject<Rest>
    : {};

function formatObject<T extends string, K extends FormatObject<T>>(
  originalString: T,
  params: K
) {
  let result: string = originalString;

  for (const key in params) {
    const value = `${params[key]}`;
    const pattern = new RegExp(`{${key}:?.*?}`, "g");
    result = result.replace(pattern, value);
  }

  return result;
}

// "Hello, polee! You have 3 new messages. Is premium? false"
const formattedType = formatObject(
  "Hello, {name:string}! You have {count:number} new messages. Is premium? {premium:boolean}",
  { name: "polee", count: 3, premium: false }
);
