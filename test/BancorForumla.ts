import { expect } from 'chai';
import { BancorFormulaInstance } from '../types/truffle-contracts';

import BigNumber from 'bignumber.js';

declare const web3: any;

const BancorFormula = artifacts.require("BancorFormula");

contract("BancorFormula", () => {
  let bancorFormula: BancorFormulaInstance;

  before(async () => {
    bancorFormula = await BancorFormula.new();
    expect(bancorFormula.address).to.exist
  })

  it('calculates the same purchase and sale rate given the same inputs', async () => {

    const purchase = await bancorFormula.calculatePurchaseReturn(
      web3.utils.toWei('2', 'ether'),
      web3.utils.toWei('0.5', 'ether'),
      500000,
      web3.utils.toWei('1', 'ether')
    );

    expect(purchase).to.exist;

    const amt = new BigNumber(web3.utils.toWei('2', 'ether')).plus(purchase);

    const sale = await bancorFormula.calculateSaleReturn(
      amt,
      web3.utils.toWei('1.5', 'ether'),
      500000,
      purchase
    );

    expect(sale).to.exist;

    // returns 0.999999999999999999 (which is close enough to 1.0)
    expect(web3.utils.fromWei(sale.toString())).to.equal('0.999999999999999999');
  })
})
