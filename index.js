/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

// const fs = require("fs");
// const path = require("path");
const process = require("process");

// function productionLoader(filepath) {
//   console.log('--------- productionLoader() ');
//   return (
//     `try {global.process.dlopen(module, ${JSON.stringify(
//       filepath
//     )}); } catch(e) {` +
//     `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
//       filepath
//     )} + ': ' + e);}`
//   );
// }

// function developmentLoader(filepath) {
//   console.log('--------- developmentLoader() ');
//   return (
//     `try {global.process.dlopen(module, ${JSON.stringify(
//       filepath
//     )}); } catch(e) {` +
//     `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
//       filepath
//     )} + ': ' + e);}`
//   );
// }

// function getCode(filepath) {
//   const jsonFilepath = JSON.stringify(filepath);
//   const code =
//     `
//     const process = require("process");
//     console.log('----------- loader()');
//     console.log(JSON.stringify(process.env, null, 4));
//     console.log('jsonFilepath: ${jsonFilepath}');
//     try {
//       global.process.dlopen(module, '${jsonFilepath}');
//     } catch(e) {
//       console.log('Error opening ${jsonFilepath}');
//       console.log(e);
//       throw new Error(e);
//     }
//     `;

//   return code;
// }

module.exports = function nodeLoader() {
  const filepath = this.resourcePath;
  const jsonFilepath = JSON.stringify(filepath);

  console.log('--------- nodeLoader() ');
  console.log(`__dirname: ${__dirname}`);
  console.log(`filepath: ${filepath}`);
  console.log(`jsonFilepath: ${jsonFilepath}`);

  const code =
    `
    const process = require('process');
    console.log('----------- loader()');
    console.log(JSON.stringify(process.env, null, 4));
    console.log('jsonFilepath: ${jsonFilepath}');
    try {
      global.process.dlopen(module, '${jsonFilepath}');
    } catch(e) {
      console.log('Error opening ${jsonFilepath}');
      console.log(e);
      throw new Error(e);
    }
    `;

  console.log(JSON.stringify(process.env, null, 4));
  console.log(code);
  return code;
}

