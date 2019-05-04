
const config = require('./config.js');

const WEB3_GANACHE = function(){
  console.log('<Ganache : web3>');
  const accessUrl = 'http://127.0.0.1:7545';
  const Web3 = require('web3');
  const provider = new Web3.providers.HttpProvider(accessUrl);
  this.web3 = new Web3(provider);
}
const WEB3_METAMASK = function(){
  console.log('<MetaMask : web3>');
  const Web3 = require('web3');
  const provider = web3.currentProvider;
  this.web3 = new Web3(provider);
}
const WEB3_LOOM = function(){
  console.log('<Loom Network : web3>');
  const Web3 = require('web3');
  const {
    Client, Contract, LocalAddress, CryptoUtils, LoomProvider
  } = require('loom-js');
  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const from = LocalAddress.fromPublicKey(publicKey).toString();
  const chainId = 'default';
  const writeUrl = 'ws://127.0.0.1:46658/websocket';
  const readUrl = 'ws://127.0.0.1:46658/queryws';
  const client = new Client(chainId,writeUrl,readUrl);
  const provider = new LoomProvider(client,privateKey);
  this.web3 = new Web3(provider);
  this.from = from;
}
const WEB3_OTHER = function(){
  console.log('<Other : web3>');
  const accessUrl = 'http://127.0.0.1:8545';
  const provider = new Web3.providers.HttpProvider(accessUrl);
  this.web3 = new Web3(provider);
}

const WEB3PROVIDER = function(){
  if(config.WEB3_KIND === "ganache"){
    const providerWeb3 = new WEB3_GANACHE();
    this.web3 = providerWeb3.web3;
  }
  else if(config.WEB3_KIND === "metamask"){
    const providerWeb3 = new WEB3_METAMASK();
    this.web3 = providerWeb3.web3;
    this.signIn();
  }
  else if(config.WEB3_KIND === "loom"){
    const providerWeb3 = new WEB3_LOOM();
    this.web3 = providerWeb3.web3;
    this.from = providerWeb3.from;
  }
  else{
    const providerWeb3 = new WEB3_OTHER();
    this.web3 = this.provider.web3;
  }
};
WEB3PROVIDER.prototype.getNetworkId = async function(){
  const networkId = await this.web3.eth.net.getId();
  return networkId;
};
WEB3PROVIDER.prototype.getFrom = async function(){
  if(config.WEB3_KIND === "loom"){
    return this.from;
  }
  else{
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }
};
WEB3PROVIDER.prototype.getAccounts = async function(){
  const accounts = await this.web3.eth.getAccounts();
  return accounts;
};
WEB3PROVIDER.prototype.signIn = async function(){
  const data = 'signData';
  const privateKey = config.PRIVATEKEY;
  const web3Sign = await this.web3.eth.accounts.sign(data,privateKey);
  const web3MsgHash = web3Sign.messageHash;
  const web3Signature = web3Sign.signature;
//  console.log(web3MsgHash + ":" + web3Signature);
};
const web3provider = new WEB3PROVIDER();

const ACCESSOR = function(){
};
ACCESSOR.prototype.getPath = function(contractName){
  const pathJson = "/home/zombie/dapps/deploy/by_truffle/build/contracts/" + contractName + ".json"
  return pathJson;
};
ACCESSOR.prototype.getContractJson = function(contractName){
  if(config.JS_KIND === "server_side"){
    const pathJson = this.getPath(contractName);
    const contractJson = require(pathJson);
    return contractJson;
  }
  else if(config.JS_KIND === "client_side"){
    // @note: abiJson_xxxx.js is required.
    return AbiJson;
  }
};
ACCESSOR.prototype.GetContract = async function(contractName){
  const contractJson = this.getContractJson(contractName);
  const contractABI = contractJson["abi"];
  const networkId = await web3provider.getNetworkId();
  const from = await web3provider.getFrom();
  const contractAddress = contractJson["networks"][networkId].address;
  const contract = new web3provider.web3.eth.Contract(contractABI,contractAddress,{from});
  return contract;
};
ACCESSOR.prototype.GetAccounts = async function(){
  const accounts = await web3provider.getAccounts();
  return accounts;
}
ACCESSOR.prototype.GetWeb3 = async function(){
  return web3provider.web3;
}
const accessor = new ACCESSOR();

if(config.JS_KIND === "server_side"){
  module.exports = accessor;
}

