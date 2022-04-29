export function getValuesFromEnum(
  enumValue: Record<string, any>,
): Array<string> {
  return Object.keys(enumValue);
}
