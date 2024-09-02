export type Split<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  };
}[keyof T];

type Resolution = {
  p360: URL;
  p480: URL;
  p720: URL;
  p1080: URL;
};

function loadSource(resolutions: Partial<Resolution>) {
  if (resolutions.p360) {
    return resolutions.p360;
  }
  if (resolutions.p480) {
    return resolutions.p480;
  }
  if (resolutions.p720) {
    return resolutions.p720;
  }
  if (resolutions.p1080) {
    return resolutions.p1080;
  }
}

// not wanted
const source = loadSource({});

function loadSource2(resolutions: Split<Resolution>) {
  //
}

// Argument of type '{}' is not assignable to parameter of type 'Split<Resolution>'.t
// const source2 = loadSource2({})
const source2 = loadSource2({ p1080: new URL(""), p360: new URL("") });

export type ExactlyOne<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  } & {
    [P in Exclude<keyof T, K>]?: never;
  };
}[keyof T];

function loadSource3(resolutions: ExactlyOne<Resolution>) {
  //
}

// Argument of type '{ p1080: URL; p360: URL; }' is not assignable to parameter of type 'ExactlyOne<Resolution>'.
// Types of property 'p360' are incompatible.
// Type 'URL' is not assignable to type 'undefined'
// const source3 = loadSource3({ p1080: new URL(""), p360: new URL("") });
const source3 = loadSource3({ p1080: new URL("") });

export type AllOrNone<T, Keys extends keyof T> =
  | Required<Pick<T, Keys>>
  | (Partial<Record<Keys, never>> & Split<T>);

function loadSource4(resolutions: AllOrNone<Resolution, "p1080">) {
  //
}
