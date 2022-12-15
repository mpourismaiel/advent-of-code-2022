const input =
  `Sensor at x=3842919, y=126080: closest beacon is at x=3943893, y=1918172
Sensor at x=406527, y=2094318: closest beacon is at x=-1066, y=1333278
Sensor at x=2208821, y=3683408: closest beacon is at x=2914373, y=3062268
Sensor at x=39441, y=1251806: closest beacon is at x=-1066, y=1333278
Sensor at x=3093352, y=2404566: closest beacon is at x=2810772, y=2699609
Sensor at x=3645473, y=2234498: closest beacon is at x=3943893, y=1918172
Sensor at x=3645012, y=2995540: closest beacon is at x=4001806, y=2787325
Sensor at x=18039, y=3083937: closest beacon is at x=103421, y=3007511
Sensor at x=2375680, y=551123: closest beacon is at x=2761373, y=2000000
Sensor at x=776553, y=123250: closest beacon is at x=-1066, y=1333278
Sensor at x=2884996, y=2022644: closest beacon is at x=2761373, y=2000000
Sensor at x=1886537, y=2659379: closest beacon is at x=2810772, y=2699609
Sensor at x=3980015, y=3987237: closest beacon is at x=3844688, y=3570059
Sensor at x=3426483, y=3353349: closest beacon is at x=3844688, y=3570059
Sensor at x=999596, y=1165648: closest beacon is at x=-1066, y=1333278
Sensor at x=2518209, y=2287271: closest beacon is at x=2761373, y=2000000
Sensor at x=3982110, y=3262128: closest beacon is at x=3844688, y=3570059
Sensor at x=3412896, y=3999288: closest beacon is at x=3844688, y=3570059
Sensor at x=2716180, y=2798731: closest beacon is at x=2810772, y=2699609
Sensor at x=3575486, y=1273265: closest beacon is at x=3943893, y=1918172
Sensor at x=7606, y=2926795: closest beacon is at x=103421, y=3007511
Sensor at x=2719370, y=2062251: closest beacon is at x=2761373, y=2000000
Sensor at x=1603268, y=1771299: closest beacon is at x=2761373, y=2000000
Sensor at x=3999678, y=1864727: closest beacon is at x=3943893, y=1918172
Sensor at x=3157947, y=2833781: closest beacon is at x=2914373, y=3062268
Sensor at x=3904662, y=2601010: closest beacon is at x=4001806, y=2787325
Sensor at x=3846359, y=1608423: closest beacon is at x=3943893, y=1918172
Sensor at x=2831842, y=3562642: closest beacon is at x=2914373, y=3062268
Sensor at x=3157592, y=1874755: closest beacon is at x=2761373, y=2000000
Sensor at x=934300, y=2824967: closest beacon is at x=103421, y=3007511
Sensor at x=3986911, y=1907590: closest beacon is at x=3943893, y=1918172
Sensor at x=200888, y=3579976: closest beacon is at x=103421, y=3007511
Sensor at x=967209, y=3837958: closest beacon is at x=103421, y=3007511
Sensor at x=3998480, y=1972726: closest beacon is at x=3943893, y=1918172`
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
