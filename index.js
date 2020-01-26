/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const fs = require("fs");
const path = require("path");
const process = require("process");

function productionLoader(filepath) {
  console.log('--------- productionLoader() ');
  return (
    `try {global.process.dlopen(module, ${JSON.stringify(
      filepath
    )}); } catch(e) {` +
    `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
      filepath
    )} + ': ' + e);}`
  );
}

function developmentLoader(filepath) {
  console.log('--------- developmentLoader() ');
  return (
    `try {global.process.dlopen(module, ${JSON.stringify(
      filepath
    )}); } catch(e) {` +
    `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
      filepath
    )} + ': ' + e);}`
  );
}

module.exports = function nodeLoader() {
  const filepath = this.resourcePath;
  console.log('--------- nodeLoader() ');
  console.log(`__dirname: ${__dirname}`);
  console.log(`filepath: ${filepath}`);
  console.log(JSON.stringify(process.env, null, 4));
  if (process.env['__TOOLBOX_MODE__'] && process.env['__TOOLBOX_MODE__'] === 'production') {
    return productionLoader(filepath);
  } else {
    return developmentLoader(filepath);
  }
}

