export default function dtoValidator(
  body: any,
  fields: Array<string>
): boolean {
  const keys = Object.keys(body);

  if (keys.length != fields.length) return false;

  let correctKeys = 0;

  keys.forEach((key) => {
    fields.forEach((field) => {
      if (key == field) correctKeys++;
    });
  });

  if (correctKeys != fields.length) return false;

  return true;
}
