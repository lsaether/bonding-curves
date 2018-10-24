import { expect } from 'chai';
import { SimpleCBTInstance } from '../types/truffle-contracts';

import BN = require('bn.js');
import Web3 = require("web3");

declare const web3: Web3;

const toWeiHandler = {
  apply: (target: any, thisArg: any, argsList: any) => {
    return new BN(target(argsList[0], argsList[1]));
  } 
}

const toWeiBN = new Proxy(web3.utils.toWei, toWeiHandler)

const SimpleCBT = artifacts.require('SimpleCBT');

const initialBalance = toWeiBN('1', 'ether');

contract('SimpleCBT', ([owner, user1, user2]) => {
  let simpleCBT: SimpleCBTInstance;

  before(async () => {
    simpleCBT = await SimpleCBT.new(500000);
    expect(simpleCBT.address).to.exist;

    const ownerOf = await simpleCBT.owner();
    expect(ownerOf).to.equal(owner);

    const totalSupply = await simpleCBT.totalSupply();
    expect(totalSupply.eq(new BN(web3.utils.toWei('1', 'ether')))).to.be.true;
  })

  it('allows purchase by sending ether to the contract [FALLBACK]', async () => {
    const buyTokens = await web3.eth.sendTransaction({
      from: user1,
      to: simpleCBT.address,
      value: web3.utils.toWei('0.05', 'ether')
    });

    expect(buyTokens.status).to.be.true;

    const totalSupply = await simpleCBT.totalSupply();
    expect(
      totalSupply.gt(new BN(web3.utils.toWei('1', 'ether')))
    ).to.be.true;
    
    const user1Bal = await simpleCBT.balanceOf(user1);
    expect(
      user1Bal.eq(totalSupply.sub(new BN(web3.utils.toWei('1', 'ether'))))
    ).to.be.true;

    // console.log(buyTokens.logs![0]);
    // console.log(buyTokens.logs![1]);

    // console.log(buyTokens);

    console.log(web3.utils.fromWei((await simpleCBT.balanceOf(user1)).toString()));
  })

  it('allows purchase by sending ether to the `mint` function', async () => {

  })

  it('allows to burn tokens', async () => {

  })
})
