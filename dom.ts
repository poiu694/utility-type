export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props?: Partial<HTMLElementTagNameMap[T]>
) {
  const element = document.createElement(tag);
  return Object.assign(element, props);
}

const anchor = createElement("a", { href: "http" });
const image = createElement("img", { src: "image" });
