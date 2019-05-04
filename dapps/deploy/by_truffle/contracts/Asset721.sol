pragma solidity >=0.5.0;

import "../openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract Asset721 is ERC721Full {
  constructor(
    string memory c_name,
    string memory c_symbol,
    uint c_tokenId,
    string memory c_tokenURI
  )
  ERC721Full(c_name, c_symbol) public {
    _mint(msg.sender, c_tokenId);
    _setTokenURI(c_tokenId, c_tokenURI);
  }
  function AddToken(uint tokenId, string calldata tokenURI) external {
    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);
  }
  function RemoveToken(uint tokenId) external {
    _burn(msg.sender, tokenId);
  }
  function ApproveToken(address to, uint256 tokenId) external {
    approve(to, tokenId);
  }
  function TransferToken(address from, address to, uint256 tokenId) external {
    require(getApproved(tokenId) == to);
    safeTransferFrom(from, to, tokenId);
  }
}



