const part1 = document
  .querySelector("pre")
  .innerText.trim()
  .split("\n")
  .filter((pair) => {
    const [elf1, elf2] = pair.split(",");
    const [x1, y1, x2, y2] = [elf1.split("-"), elf2.split("-")]
      .flat()
      .map((i) => parseInt(i));
    // x1..x2..y2..y1 || x2..x1..y1..y2
    return (x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1);
  }).length;

const part2 = document
  .querySelector("pre")
  .innerText.trim()
  .split("\n")
  .filter((pair) => {
    const [elf1, elf2] = pair.split(",");
    const [x1, y1, x2, y2] = [elf1.split("-"), elf2.split("-")]
      .flat()
      .map((i) => parseInt(i));
    // x1..x2..y2..y1 || x2..x1..y1..y2
    return !(x1 > y2 || x2 > y1);
  }).length;
