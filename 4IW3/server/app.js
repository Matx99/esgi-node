const fsPromise = require("fs/promises");
const {
  constants: { R_OK },
} = require("fs");

const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "files-to-sync", alias: "f", multiple: true, type: String },
  { name: "src", type: String, defaultOption: true },
  { name: "minor", alias: "m", type: Boolean, defaultValue: false },
  { name: "major", alias: "M", type: Boolean, defaultValue: false },
  { name: "patch", alias: "p", type: Boolean, defaultValue: false },
];

const options = commandLineArgs(optionDefinitions);
const file_path = options.src;
const files = options["files-to-sync"];

fsPromise
  .access(file_path, R_OK)
  .then(() => {
    console.log("File exists");
    return fsPromise.readFile(file_path);
  })
  .then((result) => {
    const conf = JSON.parse(result.toString());
    console.log(file_path, conf.version);
    const newVersion = managedVersion(conf.version);
    if (options.minor || options.major || options.patch) {
      files.push(file_path);
    }
    console.log(newVersion);
    Promise.all(files.map((file) => updateFile(file, newVersion)));
  })
  .catch((e) => console.error(e));

async function updateFile(file_path, versionNumber) {
  try {
    await fsPromise.access(file_path, R_OK);
    console.log(`File ${file_path} found`);
    const buffer = await fsPromise.readFile(file_path);
    const conf = JSON.parse(buffer.toString());
    conf.version = versionNumber;
    await fsPromise.writeFile(file_path, JSON.stringify(conf));
  } catch (e) {
    console.error(e);
  }
}

function managedVersion(baseVersion) {
  let [major, minor, patch] = baseVersion.split(".");
  if (options.major) major++;
  if (options.minor) minor++;
  if (options.patch) patch++;
  return [major, minor, patch].join(".");
}

// Stack d'appel
//-> mangedVersion

// EventLoop
