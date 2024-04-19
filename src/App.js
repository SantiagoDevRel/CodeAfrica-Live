import "./App.css";
import { Web3 } from "web3";
import abi from "./abi.json";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState("0");
  const [wallet, setWallet] = useState("0x");
  let web3,
    contract,
    accounts = {};

  //connect metamask
  async function connect() {
    //provider
    web3 = new Web3(window.ethereum);

    //request accounts
    accounts = await web3.eth.requestAccounts();
    setWallet(accounts[0]);

    //initialize contract
    contract = new web3.eth.Contract(abi, "0x4D721144Ab6011653CCE86E93b60B263a52f2cde");
  }

  //getBalance
  async function getBalance() {
    await connect();

    const currentBalance = await contract.methods.getBalance().call();
    setBalance(String(currentBalance));

    console.log(currentBalance);
  }

  //donate
  async function donate() {
    await connect();

    const txReceipt = await contract.methods.donate().send({ from: accounts[0], value: 1 });

    console.log(txReceipt.transactionHash);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connect}>Connect</button>
        <button onClick={getBalance}>getBalance</button>
        <button onClick={donate}>Donate</button>
        <p>Wallet: {wallet}</p>
        <p>Balance: {balance}</p>
      </header>
    </div>
  );
}

export default App;
