import { expect } from 'chai';
import { SimpleCBTInstance } from '../types/truffle-contracts';

import BigNumber from 'bignumber.js';

declare const web3: any;

const SimpleCBT = artifacts.require('SimpleCBT');

contract('SimpleCBT', ([owner, user1, user2]) => {
  let simpleCBT: SimpleCBTInstance;

  before(async () => {
    simpleCBT = await SimpleCBT.new(500000);
    expect(simpleCBT.address).to.exist;

    const ownerOf = await simpleCBT.owner();
    expect(ownerOf).to.equal(owner);
  })

  it('allows purchase by sending ether to the contract [FALLBACK]', async () => {
    const buyTokens = await web3.eth.sendTransaction({
      from: user1,
      to: simpleCBT.address,
      value: web3.utils.toWei('0.05', 'ether')
    });

    expect(buyTokens.status).to.be.true;

    console.log(buyTokens.logs[0]);
    console.log(buyTokens.logs[1]);


    // console.log(buyTokens);

    // expect(buyTokens.receipt).to.exist;
  })

  it('allows purchase by sending ether to the `mint` function', async () => {

  })

  it('allows to burn tokens', async () => {
    
  })
})