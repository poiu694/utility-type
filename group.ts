export type Group<
  Collection extends Record<string, any>,
  Selector extends keyof Collection
> = {
  [K in Collection[Selector]]: Extract<Collection, { [P in Selector]: K }>[];
};

type BaseType = {
  name: string;
  description: string;
};

type SrcType = BaseType & {
  type: "src";
  src: string;
};

type HrefType = BaseType & {
  type: "href";
  href: string;
};

type LinkType = BaseType & {
  type: "link";
  link: string;
};

type Source = SrcType | HrefType | LinkType;

const srcSource: Source = {
  name: "src-source",
  description: "src-test",
  type: "src",
  src: "src",
};

const hrefSource: Source = {
  name: "href-source",
  description: "href-test",
  type: "href",
  href: "href",
};

type ExtractedSrc1 = Extract<Source, { type: "src" }>; // SrcType

type ExtractedByGroup = SrcType extends { type: "src" } // SrcType
  ? SrcType
  : never | HrefType extends { type: "src" }
  ? HrefType
  : never | LinkType extends { type: "src" }
  ? LinkType
  : never;

// {
//  src: SrcType[] | undefined;
//  href: HrefType[] | undefined;
//  link: LinkType[] | undefined;
// }
type GroupSource = Partial<Group<Source, "type">>;

// Before

function groupByType(sources: Source[]): GroupSource {
  const groups: Partial<GroupSource> = {};

  // for (const source of sources) {
  //   switch (source.type) {
  //     case "href":
  //       groups[source.type] = groups[source.type] ?? [];
  //       groups[source.type]?.push(source);
  //       break;
  //     case "link":
  //       groups[source.type] = groups[source.type] ?? [];
  //       groups[source.type]?.push(source);
  //       break;
  //     case "src":
  //       groups[source.type] = groups[source.type] ?? [];
  //       groups[source.type]?.push(source);
  //       break;
  //     default:
  //       throw new Error("invalid source");
  //   }
  // }
  for (const source of sources) {
    (groups[source.type] as Source[]) = groups[source.type] ?? [];
    (groups[source.type] as Source[]).push(source);
  }
  return groups;
}
