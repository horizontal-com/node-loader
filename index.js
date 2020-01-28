const process = require('process');

module.exports = function nodeLoader() {

  let resourcePath = this.resourcePath;

  console.log('----------------- early');
  console.log(resourcePath);

  if (process.platform === 'win32') {
    resourcePath = resourcePath.replace(/\\/g, '\\\\');
  }
  
  console.log(resourcePath);
  
  const code = `
    const process = require('process');
    const path = require('path');
    let resourcePath = '${resourcePath}';

    console.log('------------ late');
    console.log(resourcePath);

    if (resourcePath.endsWith('pty.node')) {
      if (resourcePath.includes('.build')) {
        resourcePath = path.join(process.env['__TOOLBOX_DIRNAME__'], '..', 'app.asar.unpacked', 'node_modules', 'node-pty', 'build', 'Release', 'pty.node');
      }
    }

    try {
      global.process.dlopen(module, resourcePath); 
    } catch(e) {
      console.log('Error opening file ...');
      console.log(resourcePath);
      throw new Error(e);
    }
  `;

  console.log(code);
  return code;
}
