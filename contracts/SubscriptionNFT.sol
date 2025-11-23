// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    struct Subscription {
        uint256 tierId;
        string tierName;
        uint256 expiryDate;
        bool active;
    }

    struct Tier {
        string name;
        uint256 price;
        uint256 duration;
        bool exists;
    }

    mapping(uint256 => Subscription) public subscriptions;
    mapping(uint256 => Tier) public tiers;
    mapping(address => uint256) public activeSubscription;
    
    uint256 public tierCount;

    event SubscriptionMinted(address indexed user, uint256 tokenId, uint256 tierId);
    event SubscriptionUpgraded(address indexed user, uint256 oldTokenId, uint256 newTokenId, uint256 newTierId);
    event TierCreated(uint256 tierId, string name, uint256 price);

    constructor() ERC721("GuildFi Subscription", "GFSUB") Ownable(msg.sender) {}

    function createTier(
        string memory name,
        uint256 price,
        uint256 duration
    ) external onlyOwner {
        tierCount++;
        tiers[tierCount] = Tier({
            name: name,
            price: price,
            duration: duration,
            exists: true
        });
        
        emit TierCreated(tierCount, name, price);
    }

    function subscribe(uint256 tierId) external payable {
        require(tiers[tierId].exists, "Tier does not exist");
        require(msg.value >= tiers[tierId].price, "Insufficient payment");

        // Check if user has existing subscription
        uint256 oldTokenId = activeSubscription[msg.sender];
        
        if (oldTokenId != 0) {
            // Burn old NFT
            _burn(oldTokenId);
            delete subscriptions[oldTokenId];
        }

        // Mint new NFT
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _mint(msg.sender, newTokenId);

        subscriptions[newTokenId] = Subscription({
            tierId: tierId,
            tierName: tiers[tierId].name,
            expiryDate: block.timestamp + tiers[tierId].duration,
            active: true
        });

        activeSubscription[msg.sender] = newTokenId;

        if (oldTokenId != 0) {
            emit SubscriptionUpgraded(msg.sender, oldTokenId, newTokenId, tierId);
        } else {
            emit SubscriptionMinted(msg.sender, newTokenId, tierId);
        }
    }

    function cancelSubscription() external {
        uint256 tokenId = activeSubscription[msg.sender];
        require(tokenId != 0, "No active subscription");
        
        _burn(tokenId);
        delete subscriptions[tokenId];
        delete activeSubscription[msg.sender];
    }

    function isSubscriptionActive(address user) external view returns (bool) {
        uint256 tokenId = activeSubscription[user];
        if (tokenId == 0) return false;
        
        Subscription memory sub = subscriptions[tokenId];
        return sub.active && block.timestamp < sub.expiryDate;
    }

    function getSubscription(address user) external view returns (
        uint256 tierId,
        string memory tierName,
        uint256 expiryDate,
        bool active
    ) {
        uint256 tokenId = activeSubscription[user];
        require(tokenId != 0, "No active subscription");
        
        Subscription memory sub = subscriptions[tokenId];
        return (sub.tierId, sub.tierName, sub.expiryDate, sub.active);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}