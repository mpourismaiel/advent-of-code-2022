const input = document
  .querySelector("pre")
  .innerText.trim()
  .split("\n")
  .map((line) => {
    const [sx, sy, bx, by] = line.match(/-?\d+/g).map(Number);
    return [sx, sy, Math.abs(sx - bx) + Math.abs(sy - by)];
  });

const intersection = (reg, regions) =>
  regions
    .map((region, i) => {
      if (region[0] > reg[1] || region[1] < reg[0]) {
        return 0;
      }

      const bounds = [Math.max(reg[0], region[0]), Math.min(reg[1], region[1])];
      return (
        Math.abs(bounds[1] - bounds[0]) -
        intersection(bounds, regions.slice(i + 1))
      );
    })
    .reduce((sum, b) => sum + b, 0);

const getBounds = (y) =>
  input.reduce((tmp, [sx, sy, d]) => {
    const dx = d - Math.abs(sy - y);
    if (dx >= 0) {
      tmp.push([sx - dx, sx + dx]);
    }

    return tmp;
  }, []);

const part1 = () =>
  getBounds(2000000).reduce(
    (tmp, bound) => {
      tmp.sum +=
        Math.abs(bound[1] - bound[0]) - intersection(bound, tmp.regions);
      tmp.regions.push(bound);
      return tmp;
    },
    { regions: [], sum: 0 }
  ).sum;

const part2 = () => {
  const max = 4000000;
  let y = 0;

  while (!(max - intersection([0, max], getBounds(y)))) {
    y++;
  }

  const bounds = getBounds(y);
  for (let x = 0; x <= max; x++) {
    if (bounds.every((i) => i[0] > x || i[1] < x)) {
      return x * max + y;
    }
  }
};

console.log("part 1 =", part1());
console.log("part 2 =", part2());
