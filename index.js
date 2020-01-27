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

// module.exports = function nodeLoader() {

//   console.log(`this.resourcePath: ${this.resourcePath}`);
  
//   if (path.basename(this.resourcePath) === 'pty.node') {
//     if (process.env['__TOOLBOX_MODE__']) {
//       if (process.env['__TOOLBOX_MODE__'] == 'production') {
//         this.resourcePath = path.join(process.env['__TOOLBOX_DIRNAME__'], '..', 'app.asar.unpacked', 'node_modules', 'node-pty', 'build', 'Release', 'pty.node');
//       }
//     }
//   }

//   console.log(`this.resourcePath: ${this.resourcePath}`);

//   return (
//     `try {global.process.dlopen(module, ${JSON.stringify(
//       this.resourcePath
//     )}); } catch(e) {` +
//     `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
//       this.resourcePath
//     )} + ': ' + e);}`
//   );
// }

// module.exports = function nodeLoader() {

//   // console.log(`this.resourcePath: ${this.resourcePath}`);
//   // if (this.resourcePath.includes('.build')) {
//   //   this.resourcePath = path.join(process.env['__TOOLBOX_DIRNAME__'], '..', 'app.asar.unpacked', 'node_modules', 'node-pty', 'build', 'Release', 'pty.node');
//   // }
//   // console.log(`this.resourcePath: ${this.resourcePath}`);


//   // Let's see what things look like when the code runs.
//   return (
//     `const process = require('process');
//      const path = require('path');
//      const resourcePath = '${this.resourcePath}';
//      console.log('----------- resourcePath:');
//      console.log(resourcePath);
//      console.log(JSON.stringify(process.env, null, 4));

//     try {global.process.dlopen(module, ${JSON.stringify(
//       this.resourcePath
//     )}); } catch(e) {` +
//     `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
//       this.resourcePath
//     )} + ': ' + e);}`
//   );
// }

module.exports = function nodeLoader() {

  const code = `
    const process = require('process');
    const path = require('path');
    let resourcePath = '${this.resourcePath}';

    console.log('----------- resourcePath:');
    console.log(resourcePath);

    if (resourcePath.endsWith('pty.node')) {
      if (resourcePath.includes('.build')) {
        resourcePath = path.join(process.env['__TOOLBOX_DIRNAME__'], '..', 'app.asar.unpacked', 'node_modules', 'node-pty', 'build', 'Release', 'pty.node');
      }
    }

    console.log('----------- resourcePath:');
    console.log(resourcePath);

    // resourcePath = '"' + resourcePath + '"';

    console.log('----------- resourcePath:');
    console.log(resourcePath);

    console.log(JSON.stringify(process.env, null, 4));

    try {
      global.process.dlopen(module, resourcePath); 
    } catch(e) {
      console.log('Error opening file ...');
      console.log(resourcePath);
      console.log(e);
      throw new Error(e);
    }
  `;

  console.log(code);
  return code;
}

/*

in dev mode:

    resourcepath = /Users/wdestein/git/toolbox-intuit/desktop/electron/node_modules/node-pty/build/Release/pty.node
    "__TOOLBOX_MODE__": "development",
    "__TOOLBOX_DIRNAME__": "/Users/wdestein/git/toolbox-intuit/desktop/electron"




*/
