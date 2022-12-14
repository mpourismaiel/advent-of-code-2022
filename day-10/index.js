const input = document.querySelector("pre").innerText.trim().split("\n");

let cycles = 0,
  part1 = 0,
  x = 1,
  part2 = "";

const watchCycle = () => {
  if (cycles % 40 === 20) {
    part1 += cycles * x;
  }
};

const renderCycle = () => {
  if (cycles % 40 === 0) {
    part2 += "\n";
  }

  if (cycles % 40 === x - 1 || cycles % 40 === x || cycles % 40 === x + 1) {
    part2 += "#";
  } else {
    part2 += ".";
  }
};

for (let i = 0; i < input.length; i++) {
  renderCycle();
  cycles++;
  watchCycle();
  if (input[i].trim() !== "noop") {
    renderCycle();
    cycles++;
    watchCycle();
    x += parseInt(input[i].split(" ")[1]);
  }
}

console.log(part1);
console.log(part2);
