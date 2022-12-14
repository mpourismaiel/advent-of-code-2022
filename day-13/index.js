const input = document
  .querySelector("pre")
  .innerText.trim()
  .split("\n\n")
  .map((packet) =>
    packet
      .split("\n")
      .filter((line) => !!line)
      .map((line) => JSON.parse(line))
  );

const compare = (left, right) => {
  if (!left && left !== 0) return 1;
  if (!right && right !== 0) return -1;

  if (Array.isArray(left) || Array.isArray(right)) {
    const leftArr = Array.isArray(left) ? left : [left];
    const rightArr = Array.isArray(right) ? right : [right];
    for (let i = 0; i < Math.max(leftArr.length, rightArr.length); i++) {
      const order = compare(leftArr[i], rightArr[i]);
      if (order !== 0) {
        return order;
      }
    }

    return 0;
  }

  return left === right ? 0 : left < right ? 1 : -1;
};

const correctOrder = input.reduce((tmp, [left, right], i) => {
  if (compare(left, right) !== -1) {
    tmp.push(i + 1);
  }

  return tmp;
}, []);

const d1 = [[2]];
const d2 = [[6]];

const packets = input
  .reduce((tmp, [left, right]) => [...tmp, left, right], [d1, d2])
  .sort((a, b) => compare(b, a));

const part1 = correctOrder.reduce((prev, curr) => prev + curr, 0);
const part2 =
  (packets.findIndex((e) => compare(e, d1) === 0) + 1) *
  (packets.findIndex((e) => compare(e, d2) === 0) + 1);

console.log("part1 =", part1);
console.log("part2 =", part2);
