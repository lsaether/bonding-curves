const fs = require('fs');

const getString = (c) => {
  return `export interface ${c}Instance {\n`;
}

const main = async () => {
  const contracts = fs.readdirSync('build/contracts');
  let typeFile = fs.readFileSync('types/truffle-contracts/index.d.ts').toString();
  contracts.forEach((contract) => {
    // Remove `.json` at the end.
    contract = contract.slice(0, -5);
    const targetString = getString(contract);
    const startIndex = typeFile.indexOf(targetString);
    const endIndex = startIndex + targetString.length;
    typeFile = typeFile.slice(0, endIndex).concat('  address: string;\n').concat(typeFile.slice(endIndex));
  })
  fs.writeFileSync('types/truffle-contracts/index.d.ts', typeFile);
}

try {
  main();
  // setTimeout(main, 5000);
} catch (e) { console.error(e); }