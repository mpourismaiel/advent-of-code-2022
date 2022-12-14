const input = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((line) => line.split("").map((i) => parseInt(i)));

let part1 = 0;
let part2 = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const tree = input[i][j];
    let visibleInRowLeft = true,
      visibleInRowLeftCount = 0,
      visibleInRowRight = true,
      visibleInRowRightCount = 0,
      visibleInColTop = true,
      visibleInColTopCount = 0,
      visibleInColBottom = true,
      visibleInColBottomCount = 0;

    for (let x = i - 1; x > -1; x--) {
      visibleInRowLeftCount++;
      if (input[x][j] >= tree) {
        visibleInRowLeft = false;
        break;
      }
    }
    for (let y = j - 1; y > -1; y--) {
      visibleInColTopCount++;
      if (input[i][y] >= tree) {
        visibleInColTop = false;
        break;
      }
    }
    for (let x = i + 1; x < input.length; x++) {
      visibleInRowRightCount++;
      if (input[x][j] >= tree) {
        visibleInRowRight = false;
        break;
      }
    }
    for (let y = j + 1; y < input[i].length; y++) {
      visibleInColBottomCount++;
      if (input[i][y] >= tree) {
        visibleInColBottom = false;
        break;
      }
    }

    if (
      visibleInRowLeft ||
      visibleInRowRight ||
      visibleInColTop ||
      visibleInColBottom
    ) {
      part1++;
    }
    const score =
      visibleInRowLeftCount *
      visibleInRowRightCount *
      visibleInColTopCount *
      visibleInColBottomCount;
    if (part2 < score) {
      part2 = score;
    }
  }
}

console.log(part1);
console.log(part2);
