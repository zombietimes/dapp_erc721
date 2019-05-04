// This script is for node.js.

(async function (){
//  const accessor = require('./accessor_web3_server.js');

  const contractName = "Asset721";
  const instance = await accessor.GetContract(contractName);
  console.log(contractName);

  const accounts = await accessor.GetAccounts();
  let balance0 = 0;
  let balance1 = 0;
  console.log("accounts[0]: " + accounts[0]);
  console.log("accounts[1]: " + accounts[1]);

  const token11 = 11;
  const addr11 = await instance.methods.ownerOf(token11).call();
  const tokenURI11 = await instance.methods.tokenURI(token11).call();
  console.log("addr11: " + addr11);
  console.log("tokenURI11: " + tokenURI11);

  const token22 = 22;
  const tokenURIx = 'http://127.0.0.1:3000/images/zombie022.png';
  await instance.methods.AddToken(token22,tokenURIx).send({gas:'666666'});
  const addr22 = await instance.methods.ownerOf(token22).call();
  const tokenURI22 = await instance.methods.tokenURI(token22).call();
  console.log("addr22: " + addr22);
  console.log("tokenURI22: " + tokenURI22);

  const addr11_before = await instance.methods.ownerOf(token11).call();
  console.log("addr11_before: " + addr11_before);
  await instance.methods.ApproveToken(accounts[1],token11).send({gas:'666666'});
  console.log("transfer: " + accounts[0] + " >> " + accounts[1]);
  await instance.methods.TransferToken(accounts[0],accounts[1],token11).send({gas:'666666'});
  const addr11_after = await instance.methods.ownerOf(token11).call();
  console.log("addr11_after: " + addr11_after);
})();

