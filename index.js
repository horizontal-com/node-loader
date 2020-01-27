const process = require('process');
const path = require('path');

// module.exports = function nodeLoader() {

//   console.log('--------- nodeLoader() ');
//   console.log(`__dirname: ${__dirname}`);
  
//   const code =
//     `
//     const process = require('process');
//     const jsonFilepath = JSON.stringify(this.resourcePath);

//     console.log('----------- loader()');
//     console.log(JSON.stringify(process.env, null, 4));
//     console.log(jsonFilepath);

//     try {
//       global.process.dlopen(module, jsonFilepath);
//     } catch(e) {
//       console.log('Error opening file ...');
//       console.log(jsonFilepath);
//       console.log(e);
//       throw new Error(e);
//     }
//     `;

//   console.log(JSON.stringify(process.env, null, 4));
//   console.log(code);
//   return code;
// }

module.exports = function nodeLoader() {

  console.log('--------- nodeLoader() ');
  console.log(`__dirname: ${__dirname}`);

  let filepath = this.resourcePath;

  if (path.basename(filepath) === 'pty.node') {
    if (process.env['__TOOLBOX_MODE__']) {
      if (process.env['__TOOLBOX_MODE__'] == 'production') {
        filepath = process.env['__TOOLBOX_DIRNAME__'];
        filepath = path.join(filepath, '..', 'app.asar.unpacked', 'node_modules', 'node-pty', 'build', 'Release', 'pty.node');
      }
    }
  }

  console.log(`this.resourcePath: ${this.resourcePath}`);
  console.log(`filepath: ${filepath}`);

  const code =
    `
    const process = require('process');
    const filepath = '"${filepath}"';

    console.log('----------- loader()');
    console.log(filepath);
    console.log(JSON.stringify(process.env, null, 4));

    try {
      global.process.dlopen(module, filepath);
    } catch(e) {
      console.log('Error opening file ...');
      console.log(filepath);
      console.log(e);
      throw new Error(e);
    }
    `;

  console.log(JSON.stringify(process.env, null, 4));
  console.log(code);
  return code;
}
