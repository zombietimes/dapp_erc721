const sol = artifacts.require("./Asset721.sol");
module.exports = async(deployer, network, accounts) => {
 　const name = "Asset721";
  const symbol = "ZT";
  const tokenId = 11;
  const tokenURI = "http://127.0.0.1:3000/images/zombie011.png";
  await deployer.deploy(
    sol,
    name,
    symbol,
    tokenId,
    tokenURI
  );
};

