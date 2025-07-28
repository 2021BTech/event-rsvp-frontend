export function isFile(value: File | string): value is File {
  return value instanceof File;
}
