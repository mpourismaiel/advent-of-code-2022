const plays = ["X", "Y", "Z"];
const map = {
  A: { Z: "lose", Y: "win" },
  B: { X: "lose", Z: "win" },
  C: { Y: "lose", X: "win" },
};

const part1 = document
  .querySelector("pre")
  .innerText.split("\n")
  .reduce((totalScore, round) => {
    if (!round) {
      return totalScore;
    }

    const [opponent, play] = round.split(" ");
    const result = map[opponent];
    if (!result[play]) {
      // play isn't in the map, draw
      totalScore += 3;
    } else if (result[play] === "win") {
      totalScore += 6;
    }
    totalScore += plays.indexOf(play) + 1;

    return totalScore;
  }, 0);

const mapPart2 = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
};

const part2 = document
  .querySelector("pre")
  .innerText.split("\n")
  .reduce((totalScore, round) => {
    if (!round) {
      return totalScore;
    }

    const [opponent, result] = round.split(" ");
    if (result === "Y") {
      totalScore += 3;
    } else if (result === "Z") {
      totalScore += 6;
    }
    totalScore += plays.indexOf(mapPart2[opponent][result]) + 1;
    return totalScore;
  }, 0);
