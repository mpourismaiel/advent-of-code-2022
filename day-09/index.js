class Knot {
  x = 0;
  y = 0;
  index = 0;
  visited = new Set();

  constructor(index) {
    this.index = index;
  }

  touching(knot) {
    return this.x === knot.x && this.y === knot.y;
  }

  neighboring(knot) {
    return [
      [this.x, this.y - 1],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
      [this.x - 1, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y + 1],
      [this.x - 1, this.y + 1],
    ].some((p) => knot.x === p[0] && knot.y === p[1]);
  }

  move(direction) {
    this.x += direction[0];
    this.y += direction[1];
  }

  diff(knot) {
    const dx = this.x - knot.x;
    const dy = this.y - knot.y;

    return [dx, dy];
  }
}

const Moves = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const head = new Knot();
const tail = new Knot();

const input = document.querySelector("pre").innerText.split("\n");

// convert R 2\nU 4 to RRUUUU
let directions = [];
for (let i = 0; i < input.length; i++) {
  const [dir, times] = input[i].split(" ");
  for (let j = 0; j < parseInt(times); j++) {
    directions.push(dir);
  }
}

const moveRope = (length, directions) => {
  const rope = Array.from({ length }, (_, i) => new Knot(i));
  const slices = [];
  for (let i = 0; i < rope.length - 1; i++) {
    slices.push(rope.slice(i, i + 2));
  }
  const ropeHead = rope[0];
  const ropeTail = rope[rope.length - 1];

  for (let i = 0; i < directions.length; i++) {
    ropeHead.move(Moves[directions[i]]);

    for (let j = 0; j < slices.length; j++) {
      const [lead, trail] = slices[j];

      const shouldMove = trail.touching(lead) || trail.neighboring(lead);
      if (!shouldMove) {
        const [dx, dy] = lead.diff(trail);

        trail.move([
          dx === 0 ? 0 : dx > 0 ? 1 : -1,
          dy === 0 ? 0 : dy > 0 ? 1 : -1,
        ]);
      }
    }

    ropeTail.visited.add(`${ropeTail.x},${ropeTail.y}`);
  }

  return ropeTail.visited.size;
};

const part1 = moveRope(2, directions);
const part2 = moveRope(10, directions);
console.log(part1);
console.log(part2);
