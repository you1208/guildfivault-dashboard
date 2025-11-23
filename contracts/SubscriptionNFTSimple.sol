// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionNFTSimple is ERC721, Ownable {
    uint256 private _tokenIds;
    
    struct Subscription {
        string tierName;
        uint256 expiryDate;
    }
    
    mapping(uint256 => Subscription) public subscriptions;
    mapping(address => uint256) public userSubscription;
    
    event Subscribed(address indexed user, uint256 tokenId, string tierName);
    
    constructor() ERC721("GuildFi Sub", "GFSUB") Ownable(msg.sender) {}
    
    function subscribe(string memory tierName, uint256 duration) external {
        // Burn old NFT if exists
        if (userSubscription[msg.sender] != 0) {
            _burn(userSubscription[msg.sender]);
        }
        
        // Mint new NFT
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        
        _mint(msg.sender, newTokenId);
        
        subscriptions[newTokenId] = Subscription({
            tierName: tierName,
            expiryDate: block.timestamp + duration
        });
        
        userSubscription[msg.sender] = newTokenId;
        
        emit Subscribed(msg.sender, newTokenId, tierName);
    }
    
    function isActive(address user) external view returns (bool) {
        uint256 tokenId = userSubscription[user];
        if (tokenId == 0) return false;
        return block.timestamp < subscriptions[tokenId].expiryDate;
    }
}