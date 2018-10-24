const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8577');
const defaultSigner = provider.getSigner(1);

const { utils } = ethers;

(async () => {
  console.log(`On network: ${JSON.stringify(await provider.getNetwork())}`);
  console.log(`Signing for account: ${await defaultSigner.getAddress()}`)

  const artifact = require('../build/contracts/BancorFormula.json');
  const bancorFormulaFactory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, defaultSigner);
  const bancorFormula = await bancorFormulaFactory.deploy();
  const range = [...new Array(11).keys()].slice(1);

  // Transform to wei
  const weiArray = range.map(val => utils.parseUnits(String(val), 'ether'));

  for (let i = 0; i < weiArray.length; i++) {
    
  }
})();
