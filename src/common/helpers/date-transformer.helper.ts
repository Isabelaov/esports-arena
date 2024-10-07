export function dateToGMT5(value: any): Date {
  if (!value) return value;
  const date = new Date(value);
  date.setHours(date.getHours() + 5);
  return date;
}
