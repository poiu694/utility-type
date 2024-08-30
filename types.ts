export type User = {
  name: string;
  age: number;
  profession?: string;
  posts(): string[];
  greeting(): string;
};
