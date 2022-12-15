const input = document
  .querySelector("pre")
  .innerText.trim()
  .split("\n")
  .map((stone) =>
    stone.split("->").map((segment) =>
      segment
        .trim()
        .split(",")
        .map((i) => parseInt(i))
    )
  );

const debugCave = (cave) => {
  for (let x = 0; x < cave[0].length; x++) {
    let row = (x + "").padEnd(2, " ");
    for (let y = 489; y < cave.length; y++) {
      row += cave[y][x];
    }
    console.log(row);
  }
  console.log("");
};

const maxXY = (tmp, [y, x]) => {
  if (y > tmp[0]) {
    tmp[0] = y;
  }

  if (x > tmp[1]) {
    tmp[1] = x;
  }

  return tmp;
};

const [maxY, maxX] = input.reduce(
  (tmp, stone) => {
    const [y, x] = stone.reduce(maxXY, [0, 0]);

    return maxXY(tmp, [y, x]);
  },
  [0, 0]
);

const solve = (part) => {
  const fillY = (x, y1, y2) => {
    for (let y = y1; y <= y2; y++) {
      cave[y][x] = "#";
    }
  };

  const fillX = (y, x1, x2) => {
    for (let x = x1; x <= x2; x++) {
      cave[y][x] = "#";
    }
  };

  const createRow = () =>
    part === 1
      ? Array.from({ length: maxX + 2 }, () => ".")
      : Array.from({ length: maxX + 3 }, (_, i) =>
          i === maxX + 2 ? "#" : "."
        );
  const cave = Array.from({ length: maxY + 1 }, createRow);

  input.forEach((stone) => {
    stone.forEach(([y, x], i) => {
      cave[y][x] = "#";
      if (i > 0) {
        const prevSeg = stone[i - 1];

        if (x === prevSeg[1]) {
          fillY(prevSeg[1], Math.min(prevSeg[0], y), Math.max(prevSeg[0], y));
        } else {
          fillX(prevSeg[0], Math.min(prevSeg[1], x), Math.max(prevSeg[1], x));
        }
      }
    });
  });

  cave[500][0] = "+";
  const mainDust = [500, 0];
  const Moves = [
    [0, 1],
    [-1, 1],
    [1, 1],
  ];

  let lastDust = [...mainDust];
  let lastFilled = null;
  let dustCount = 0;
  while (
    lastDust[1] !== cave[0].length - 1 &&
    (!lastFilled ||
      lastFilled[0] !== lastDust[0] ||
      lastFilled[1] !== lastDust[1])
  ) {
    const isAir = Moves.find(([y, x]) => {
      if (!cave[lastDust[0] + y]) {
        cave[lastDust[0] + y] = createRow();
      }

      return cave[lastDust[0] + y][lastDust[1] + x] === ".";
    });
    if (isAir) {
      lastDust = [lastDust[0] + isAir[0], lastDust[1] + isAir[1]];
    } else {
      cave[lastDust[0]][lastDust[1]] = "o";
      lastFilled = [...lastDust];
      dustCount++;
      lastDust = [...mainDust];
      // debugCave(cave);
    }
  }

  return dustCount;
};

console.log("part 1 =", solve(1));
console.log("part 2 =", solve(2));
