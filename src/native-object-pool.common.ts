
export function canBeWrapped(value: any) {
  const noWrapableType = ["[object String]", "[object Number]"];
  const toStringValue = Object.prototype.toString.call(value);
  return !~noWrapableType.indexOf(toStringValue);
};
