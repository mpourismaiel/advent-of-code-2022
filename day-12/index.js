const input = document.querySelector("pre").innerText.trim().split("\n");

const solve = (pos) => {
  const data = input.map((line, indexY) =>
    line.split("").map((char, indexX) => {
      if (char === "S") {
        if (pos.s.x === indexX && pos.s.y === indexY) {
          return Infinity;
        } else {
          return "a".charCodeAt(0);
        }
      }
      if (char === "E") {
        return "z".charCodeAt(0);
      } else return char.charCodeAt(0);
    })
  );

  const visited = data.map((line) => line.map(() => false));
  const paths = data.map((line) => line.map(() => Infinity));
  paths[pos.e.y][pos.e.x] = 0;

  const queue = [pos.e];
  const moves = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  while (queue.length > 0) {
    let pos = queue.shift();
    visited[pos.y][pos.x] = true;

    moves
      .map(([x, y]) => ({ x: pos.x + x, y: pos.y + y }))
      .filter((neighbour) => {
        return data[neighbour.y]?.[neighbour.x] !== undefined;
      })
      .forEach((neighbour) => {
        if (data[pos.y][pos.x] >= data[neighbour.y][neighbour.x] - 1) {
          paths[pos.y][pos.x] = Math.min(
            paths[pos.y][pos.x],
            paths[neighbour.y][neighbour.x] + 1
          );
        }

        if (
          !visited[neighbour.y][neighbour.x] &&
          data[pos.y][pos.x] <= data[neighbour.y][neighbour.x] + 1
        ) {
          queue.push(neighbour);
          visited[neighbour.y][neighbour.x] = true;
        }
      });
  }

  return paths[pos.s.y][pos.s.x];
};

const pos = {};
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "S") {
      pos.s = { x, y };
    } else if (input[y][x] === "E") {
      pos.e = { x, y };
    }

    if (pos.s && pos.e) {
      break;
    }
  }

  if (pos.s && pos.e) {
    break;
  }
}

const part1 = solve(pos);
console.log(part1);

const end = pos.e;
let part2 = Infinity;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === "S" || input[y][x] === "a") {
      const result = solve({ s: { x, y }, e: end });
      if (result < part2) {
        part2 = result;
      }
    }
  }
}

console.log(part2);
