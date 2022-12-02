// Run in browser console on the input page
// https://adventofcode.com/2022/day/1/input
const part1 = document
  .querySelector("pre")
  .innerText.split("\n\n")
  .map((elf) =>
    elf.split("\n").reduce((tmp, weight) => tmp + parseInt(weight), 0)
  )
  .reduce((max, weight) => (weight > max ? weight : max), -1);

const part2 = document
  .querySelector("pre")
  .innerText.split("\n\n")
  .map((elf) =>
    elf.split("\n").reduce((tmp, weight) => tmp + parseInt(weight), 0)
  )
  .sort((a, b) => (a > b ? -1 : 1))
  .slice(0, 3)
  .reduce((tmp, total) => tmp + total, 0);
