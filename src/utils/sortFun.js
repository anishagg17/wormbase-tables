export default function(a, b, sort) {
  const r = sort ? -1 : 1;
  if (a > b) {
    return -r;
  }
  if (b > a) {
    return r;
  }
  return 0;
}
