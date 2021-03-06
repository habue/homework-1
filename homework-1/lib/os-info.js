const { cpus, networkInterfaces, totalmem, release } = require('os');

const getCPUInfo = () => cpus()[0].model;

const getLocalIP = () => {
  const interfaces = networkInterfaces();

  for (const interface1 in interfaces) {
    for (const interface2 in interfaces[interface1]) {
      const address = interfaces[interface1][interface2];

      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  networkInterfaces().eth0[0].address;
}

const getTotalRAM = () => Math.ceil(totalmem() / (1024 ** 3));

const getReleaseName = () => release();

const returnOsInfo = (argv) => {
  const argvArr = Object.keys(argv);
  const output = [];

  argvArr.forEach(arg => {
    arg === 'cpu' && output.push(getCPUInfo());
    arg === 'lan' && output.push(getLocalIP());
    arg === 'ram' && output.push(getTotalRAM());
    arg === 'os-name' && output.push(getReleaseName());
    arg === 'full-info' && output.push(`Processor: ${getCPUInfo()}\nIP: ${getLocalIP()}\nRAM: ${getTotalRAM()}`);
  });

  output.length && console.log(output.join('\n'));
};

module.exports = { returnOsInfo };