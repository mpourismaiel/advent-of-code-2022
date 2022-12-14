const input = document.querySelector("pre").innerText.trim().split("\n");

const MonkeyTemplate = {
  totalVisitedItems: 0,
};

const operationGenerator = (operationString) => {
  const operand = (old) =>
    operationString[2] === "old" ? old : parseInt(operationString[2]);

  if (operationString[1] === "+") {
    return (old) => old + operand(old);
  } else if (operationString[1] === "*") {
    return (old) => old * operand(old);
  }
};

const solve = (isPart2) => {
  const monkeys = [];
  let i = 0;
  while (i < input.length) {
    const line = input[i];
    if (line.trim().startsWith("Monkey")) {
      const index = parseInt(line.split(" ")[1].replace(":", ""));
      const items = input[++i]
        .split(":")[1]
        .split(",")
        .map((item) => parseInt(item));
      const operation = operationGenerator(
        input[++i].split(":")[1].split("=")[1].trim().split(" ")
      );
      const test = parseInt(input[++i].split(":")[1].trim().split(" ")[2]);
      const testTrue = parseInt(input[++i].match(/\d+$/)[0]);
      const testFalse = parseInt(input[++i].match(/\d+$/)[0]);
      const monkey = {
        ...MonkeyTemplate,
        index,
        items,
        operation,
        test,
        testTrue,
        testFalse,
      };
      monkeys.push(monkey);
    } else {
      i++;
    }
  }

  const findMonkey = (i) => monkeys.find((monkey) => monkey.index === i);

  const accTest = monkeys.reduce((tmp, monkey) => tmp * monkey.test, 1);

  for (let round = 0; round < (isPart2 ? 10000 : 20); round++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        let newItem = monkey.operation(item);
        if (isPart2) {
          newItem %= accTest;
        } else {
          newItem = Math.floor(newItem / 3);
        }

        if (newItem % monkey.test === 0) {
          findMonkey(monkey.testTrue).items.push(newItem);
        } else {
          findMonkey(monkey.testFalse).items.push(newItem);
        }

        monkey.totalVisitedItems++;
      }
    });
  }

  const visitedTimes = monkeys
    .map((monkey) => {
      return monkey.totalVisitedItems;
    })
    .sort((a, b) => (a > b ? 1 : -1));

  return visitedTimes.slice(-2)[0] * visitedTimes.slice(-2)[1];
};

const part1 = solve(false);
console.log("part1 =", part1);
const part2 = solve(true);
console.log("part2 =", part2);
