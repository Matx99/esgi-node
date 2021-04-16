const fs = require("fs/promises");
const {
  constants: { R_OK },
} = require("fs");
const backup = require("./backup.json");
const filePath = "./access.log";

const options = process.argv.slice(2);

//fs.access(filePath, R_OK)
//  .then((_) => {
//    console.log(`${filePath} found`);
//    return fs.readFile(filePath);
//  })
//  .then((buffer) => {
//    const lines = buffer.toString().split("\n");
//    let count = 0;
//    lines.forEach((l) => {
//      const Line = parseLine(l);
//      backupLine(Line).then(() => {
//        count++;
//        if (count === lines.length) {
//          fs.writeFile("./backup.json", JSON.stringify(backup));
//        }
//      });
//    });
//  })
//  .catch((e) => console.error(e));

fs.access(filePath, R_OK)
  .then((_) => {
    console.log(`${filePath} found`);
    return fs.readFile(filePath);
  })
  .then((buffer) =>
    options[0] === "--truncate"
      ? fs.truncate(filePath).then((_) => buffer)
      : buffer
  )
  .then((buffer) => {
    const lines = buffer.toString().split("\n");
    return Promise.all(
      lines.map((l) => {
        const Line = parseLine(l);
        return backupLine(Line);
      })
    );
  })
  .then((_) => fs.writeFile("./backup.json", JSON.stringify(backup)))
  .catch((e) => console.error(e));

function parseLine(line) {
  const [, date, app, log] = line.match(/(\d{4}-\d{2}-\d{2})\s+(\w+)\s+(.*)/);
  return {
    date,
    app,
    log,
  };
}

async function backupLine(line) {
  backup[line.app] ??= {};
  backup[line.app][line.date] ??= [];

  backup[line.app][line.date].push(line.log);
}
