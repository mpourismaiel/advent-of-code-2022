const input = document.querySelector("pre").innerText.split("\n");

const manifest = input.reduce(
  (tmp, line) => {
    if (!line.trim()) {
      return tmp;
    }

    if (line.trim().startsWith("move")) {
      tmp.instructions.push(
        line
          .trim()
          .match(/\d+/g)
          .map((i) => parseInt(i))
      );
    } else {
      let cargo = line.split("");
      let fullCargo = [];
      while (cargo.length > 0) {
        const part = cargo.splice(0, 3).join("");
        if (cargo.length > 0) {
          cargo.splice(0, 1);
        }
        fullCargo.push(
          parseInt(part).toString() === part.trim() ? parseInt(part) : part
        );
      }
      tmp.cargo.push(fullCargo);
    }

    return tmp;
  },
  { cargo: [], instructions: [] }
);

const genCargoArray = (cargo) => {
  const tmp = [];
  cargo[cargo.length - 1].forEach(
    (i) =>
      (tmp[i] = cargo
        .slice(0, cargo.length - 1)
        .map((row) => row[i - 1])
        .filter((stack) => stack.trim() !== "")
        .reverse())
  );

  return tmp;
};

manifest.cargo = genCargoArray(manifest.cargo);

const solvePart1 = () =>
  manifest.instructions
    .reduce((cargo, instruction) => {
      const [count, start, finish] = instruction;
      const top = cargo[start].slice(cargo[start].length - count).reverse();
      cargo[start] = cargo[start].slice(0, cargo[start].length - count);
      cargo[finish] = [...cargo[finish], ...top];
      return cargo;
    }, manifest.cargo)
    .map((stack) => stack[stack.length - 1].replace(/[\[\]]/g, ""))
    .join("");

const solvePart2 = () =>
  manifest.instructions
    .reduce((cargo, instruction) => {
      const [count, start, finish] = instruction;
      const top = cargo[start].slice(cargo[start].length - count);
      cargo[start] = cargo[start].slice(0, cargo[start].length - count);
      cargo[finish] = [...cargo[finish], ...top];
      return cargo;
    }, manifest.cargo)
    .map((stack) => stack[stack.length - 1].replace(/[\[\]]/g, ""))
    .join("");
