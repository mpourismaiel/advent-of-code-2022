const input = document.querySelector("pre").innerText;

const lines = input.trim().split("\n");
const dir = {
  "/": {
    parent: null,
    files: {},
    dirs: {},
    totalSize: 0,
  },
};
let currentDir = dir["/"];

const isCommand = (line) => /^\$\s/.test(line);

const getCommand = (line) => line.replace(/^\$\s/, "").split(" ");

const changeDir = (command) => {
  if (command[1] === "/") {
    currentDir = dir["/"];
  } else if (command[1] === "..") {
    currentDir = currentDir.parent;
  } else {
    if (currentDir.dirs[command[1]]) {
      currentDir = currentDir.dirs[command[1]];
    } else {
      createDir(command[1]);
    }
  }
};

const createDir = (dir) => {
  currentDir.dirs[dir] = {
    parent: currentDir,
    files: {},
    dirs: {},
    totalSize: 0,
  };
};

let i = 0;
while (i < lines.length) {
  let line = lines[i];
  const command = getCommand(line);
  if (command[0] === "cd") {
    changeDir(command);
  } else if (command[0] === "ls") {
    i++;
    line = lines[i];
    while (i < lines.length && !isCommand(line)) {
      const fileName = line.split(" ").slice(1).join(" ");
      if (line.startsWith("dir")) {
        createDir(fileName);
      } else {
        const size = parseInt(line.split(" ")[0]);
        currentDir.files[fileName] = size;

        let tmpCurrentDir = currentDir;
        while (tmpCurrentDir) {
          tmpCurrentDir.totalSize += size;
          tmpCurrentDir = tmpCurrentDir.parent;
        }
      }
      i++;
      line = lines[i];
    }
    i--;
  }
  i++;
}

const walk = (directory) => {
  const dirs = Object.values(directory.dirs);
  let sumOfAll100kbDirs =
    directory.totalSize > 100000 ? 0 : directory.totalSize;
  for (let i = 0; i < dirs.length; i++) {
    sumOfAll100kbDirs += walk(dirs[i]);
  }
  return sumOfAll100kbDirs;
};

const part1 = walk(dir["/"]);

const freeSpace = 70000000 - dir["/"].totalSize;
const requiredSpace = 30000000;

let viableDirectorySize = Infinity;
const walk2 = (directory) => {
  const dirs = Object.values(directory.dirs);
  if (
    directory.totalSize + freeSpace > requiredSpace &&
    directory.totalSize < viableDirectorySize
  ) {
    viableDirectorySize = directory.totalSize;
  }

  for (let i = 0; i < dirs.length; i++) {
    walk2(dirs[i]);
  }
};
walk2(dir["/"]);
const part2 = viableDirectorySize;

console.log(part1);
console.log(part2);
