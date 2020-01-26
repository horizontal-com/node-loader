/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const fs = require("fs");
const path = require("path");

module.exports = function nodeLoader() {
  const filename = path.basename(this.resourcePath);
  const src = fs.readFileSync(this.resourcePath, {encoding: "binary"});
  const script = `
const nodeFilename = ${JSON.stringify(filename)};
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

  console.log(script);
  return script;
};

// module.exports = function nodeLoader() {
//   return (
//     `try {global.process.dlopen(module, ${JSON.stringify(
//       this.resourcePath
//     )}); } catch(e) {` +
//     `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
//       this.resourcePath
//     )} + ': ' + e);}`
//   );
// };
