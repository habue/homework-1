const { EventEmitter } = require('events');
const readDir = require('./readDir');
const events = require('../constants');

class Finder extends EventEmitter {
  constructor(targetFolder, searchDeep, regExp) {
    super();

    this.targetFolder = targetFolder;
    this.searchDeep = searchDeep;
    this.regExp = regExp;
    this.timer;
    this.dirsFound = 0;
    this.filesFound = 0;

    this.on(events.PROCCESS, (type) => {
      if (type === 'dir') this.dirsFound++;
      if (type === 'file') this.filesFound++;
    })
    this.on(events.FIND, this.startTimer)
    process.nextTick(() => this.emit(events.INIT));
  }

  parse() {
    console.log("parse start")
    this.startTimer();
    readDir(
      this.targetFolder,
      this.searchDeep,
      this.regExp,
      this.targetFolder,
      this.emit.bind(this),
    ).then((paths) => this.emit(events.COMPLETE, {
      paths,
      proccesed: {
        dirs: this.dirsFound,
        files: this.filesFound,
      }
    }))
  }

  startTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.emit(events.PROGRESS, {
        dirsFound: this.dirsFound,
        filesFound: this.filesFound,
      });
    }, 3000);
  }
}

module.exports = Finder;