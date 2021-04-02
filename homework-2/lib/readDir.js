const { readdir } = require('fs/promises');
const { join, relative, sep } = require('path');
const events = require('../constants');

const readDir = async (path, deep, regExp, basePath, emmiter) => {
  const findFiles = [];
  try {
    const files = await readdir(path, { withFileTypes: true });
    for await (const file of files) {
      const dirPath = join(path, file.name);
      if (file.isDirectory()) {
        emmiter(events.PROCCESS, 'dir');
        const relativePath = relative(dirPath, basePath);
        const hopsCount = relativePath.split(sep);
        if (deep && hopsCount.length > deep) continue;
        findFiles.push(...(await readDir(dirPath, deep, regExp, basePath, emmiter)));
      } else if (file.isFile()) {
        emmiter(events.PROCCESS, 'file');
        if (new RegExp(regExp).test(file.name)) {
          emmiter(events.FIND, relative(basePath, dirPath));
          findFiles.push(dirPath);
        }
      }
    }
    return findFiles;
  } catch(e) {
    emmiter(events.ERROR, e)
  }
}

module.exports = readDir;