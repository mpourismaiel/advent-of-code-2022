const input = document.querySelector("pre").innerText.split("\n");

const solve = (som) => {
  let tmp = "";
  for (let i = 0; i < input.length; i++) {
    if (tmp.length === som) {
      return i;
    }

    if (tmp.includes(input[i])) {
      tmp = tmp.slice(tmp.indexOf(input[i]) + 1);
    }

    tmp += input[i];
  }
};

const part1 = solve(4);
const part2 = solve(14);
