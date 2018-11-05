import React, { Component } from 'react';
import './App.css';

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

import * as Web3 from 'web3';

const w3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8577'));

const CBT = new w3.eth.Contract(require('./SimpleCBT.json').abi)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: 0,
      cbt: '',
      data: [
        {name: 'one', uv: 1},
        {name: 'two', uv: 3},
        {name: 'three', uv: 6},
      ],
      poolBalance: '',
      totalSupply: '',
    };

    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
  }

  async componentWillMount() {
    const account = (await w3.eth.getAccounts())[0];
    const balance = await w3.eth.getBalance(account);
    const cbt = await CBT.deploy({ data: require('./SimpleCBT.json').bytecode, arguments: [ 10 ] }).send({ from: account, gasPrice: '12', gas: '6000000' });
    const range = [...new Array(300).keys()].slice(1).map(val => w3.utils.toWei(String(val), 'ether'));
    const data = await Promise.all(range.map(async val => new Object({name: w3.utils.fromWei(val, 'ether'), uv: w3.utils.fromWei(await cbt.methods.calculateCurvedMintReturn(val).call(), 'ether')})));
    const poolBalance = await cbt.methods.poolBalance().call();
    const totalSupply = await cbt.methods.totalSupply().call();

    console.log(data)
    this.setState({
      account,
      balance,
      cbt,
      data,
      poolBalance,
      totalSupply,
    })
  }

  async handleBuy() {
    console.log('handling buy')
    this.state.cbt.methods.mint().send({
      from: (await w3.eth.getAccounts())[0],
      value: w3.utils.toWei('0.05', 'ether'), 
    })
  }

  async handleSell() {
    console.log('handling sell')
    this.state.cbt.methods.burn(
      w3.utils.toWei('0.05', 'ether')
    ).send({
      from: (await w3.eth.getAccounts())[0],
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p>Account: {this.state.account} - Balance: {this.state.balance}</p>
        <p>CBT: {this.state.cbt.options ? this.state.cbt.options.address : ''}</p>

        <LineChart width={730} height={250} data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        <p>Pool Balance: {this.state.poolBalance}</p>
        <p>Total Supply: {this.state.totalSupply}</p>
        <p>Current Price: </p>
        <p>Market Cap: </p>

        <div className="button-container">
          <button onClick={this.handleBuy}>Buy</button>
          <button onClick={this.handleSell}>Sell</button>
        </div>

        </header>
      </div>
    );
  }
}

export default App;
