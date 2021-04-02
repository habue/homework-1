const Finder = require('./lib/Finder');
const events = require('./constants');

require('./lib/patch-log');

const targetFolder = __dirname;
const searchDeep = 2;
const regExp = '.*?\.json';

const FinderInst = new Finder(targetFolder, searchDeep, regExp);

FinderInst.once(events.INIT, () => {
  FinderInst.parse();
});

FinderInst.on(events.FIND, (path) => {
  console.log('Find', path)
});

FinderInst.once(events.COMPLETE, (data) => {
  console.log('Complete', data)
});

FinderInst.on(events.PROGRESS, (handler) => {
  console.log('Progress', handler)
});

FinderInst.once(events.ERROR, (err) => {
  console.error('error', error)
  process.exit(1);
});