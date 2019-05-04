const sol = artifacts.require('Asset721.sol');
contract('Asset721', function (accounts){
  it("tokenId:11 tokenURI:",async()=>{
    const tokenId = 11;
    const instance = await sol.deployed();
    const addrX = await instance.ownerOf(tokenId);
    const tokenURI = await instance.tokenURI(tokenId);
    assert.equal(tokenURI,"http://127.0.0.1:3000/images/zombie011.png","The tokenURI is not correct.");
  });
  it("tokenId:22 tokenURI:",async()=>{
    const tokenId = 22;
    const instance = await sol.deployed();
    const tokenURIx = 'http://127.0.0.1:3000/images/zombie022.png';
    await instance.AddToken(tokenId,tokenURIx);
    const addrX = await instance.ownerOf(tokenId);
    const tokenURIy = await instance.tokenURI(tokenId);
    assert.equal(tokenURIy,"http://127.0.0.1:3000/images/zombie022.png","The tokenURI is not correct.");
  });
  it("transfer tokenId:11 >> 22",async()=>{
    const tokenId = 11;
    const instance = await sol.deployed();
    const addrX = await instance.ownerOf(tokenId);
    assert.equal(addrX,accounts[0],"The token owner is not correct.");
    await instance.ApproveToken(accounts[1],tokenId);
    await instance.TransferToken(accounts[0],accounts[1],tokenId);
    const addrY = await instance.ownerOf(tokenId);
    assert.equal(addrY,accounts[1],"The token owner is not correct.");
  });
});



