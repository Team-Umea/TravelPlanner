export function generateID(array) {
  if (array.length === 0) {
    return 1;
  } else {
    return Math.max(...array.map((item) => item.id)) + 1;
  }
}
