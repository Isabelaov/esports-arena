import { Transform } from 'class-transformer';

export function TrimString() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  });
}

export function StringToUppercase() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLocaleUpperCase();
    }
    return value;
  });
}
