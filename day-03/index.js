const getSimilar = (m, n) => {
  for (let i = 0; i < m.length; i++) {
    if (n.includes(m[i])) {
      return m[i];
    }
  }

  return null;
};

const getBadge = (m, n, o) => {
  for (let i = 0; i < m.length; i++) {
    if (n.includes(m[i]) && o.includes(m[i])) {
      return m[i];
    }
  }

  return null;
};

const getPrio = (item) => {
  if (!item) {
    return 0;
  }

  const prio = item.charCodeAt(0) - 96;
  if (prio > 0) {
    return prio;
  }

  return prio + 58;
};

const getSum = (sum, prio) => sum + prio;

const part1 = document
  .querySelector("pre")
  .innerText.split("\n")
  .map((sack) =>
    getPrio(
      getSimilar(sack.slice(0, sack.length / 2), sack.slice(sack.length / 2))
    )
  )
  .reduce(getSum);

const input = document.querySelector("pre").innerText.split("\n");

const groups = [];
while (input.length > 0) {
  groups.push(input.splice(0, 3));
}

const part2 = groups.map((group) => getPrio(getBadge(...group))).reduce(getSum);
