/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const fs = require("fs");
const path = require("path");
const process = require("process");

function oldProductionLoader() {
  const dirname = process.env['__TOOLBOX_DIRNAME__'];
  const filename = path.basename(this.resourcePath);
  const filepath = path.join(dirname, filename);
  console.log(`this.resourcePath: ${this.resourcePath}`);
  console.log(`filename: ${filename}`);
  console.log(`filepath: ${filepath}`);
  const src = fs.readFileSync(this.resourcePath, {encoding: "binary"});
  
  return `
const nodeFilename = ${JSON.stringify(filepath)};
const src = ${JSON.stringify(src)};
require("fs").writeFileSync(nodeFilename, src, "binary");
try {
  global.process.dlopen(
    module,
    nodeFilename
  );
} catch(e) {
  throw new Error('node-loader: Cannot open ' + nodeFilename + ': ' + e);
}
`;
}

function productionLoader() {
  console.log('--------- productionLoader() ');
  console.log(`this.resourcePath: ${this.resourcePath}`);
  return (
    `try {global.process.dlopen(module, ${JSON.stringify(
      this.resourcePath
    )}); } catch(e) {` +
    `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
      this.resourcePath
    )} + ': ' + e);}`
  );
}

function developmentLoader() {
  console.log('--------- developmentLoader() ');
  console.log(`this.resourcePath: ${this.resourcePath}`);
  return (
    `try {global.process.dlopen(module, ${JSON.stringify(
      this.resourcePath
    )}); } catch(e) {` +
    `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
      this.resourcePath
    )} + ': ' + e);}`
  );
}

if (process.env['__TOOLBOX_MODE__'] && process.env['__TOOLBOX_MODE__'] === 'production') {
  module.exports = productionLoader;
} else {
  module.exports = developmentLoader;
}
