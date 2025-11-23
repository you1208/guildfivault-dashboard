const hre = require("hardhat");

async function main() {
  console.log("Deploying SubscriptionNFT to BlockDAG Testnet...");
  
  // Get signer
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "BDAG");

  const SubscriptionNFT = await hre.ethers.getContractFactory("SubscriptionNFT");
  
  console.log("Sending deployment transaction...");
  const subscriptionNFT = await SubscriptionNFT.deploy({
    gasLimit: 5000000,
  });

  console.log("Waiting for deployment confirmation...");
  await subscriptionNFT.waitForDeployment();

  const address = await subscriptionNFT.getAddress();
  console.log("✅ SubscriptionNFT deployed to:", address);

  // Create default tiers
  console.log("\nCreating default tiers...");

  const tx1 = await subscriptionNFT.createTier(
    "Silver",
    hre.ethers.parseEther("0.001"),
    30 * 24 * 60 * 60,
    { gasLimit: 500000 }
  );
  await tx1.wait();
  console.log("✅ Silver tier created");

  const tx2 = await subscriptionNFT.createTier(
    "Gold",
    hre.ethers.parseEther("0.002"),
    30 * 24 * 60 * 60,
    { gasLimit: 500000 }
  );
  await tx2.wait();
  console.log("✅ Gold tier created");

  const tx3 = await subscriptionNFT.createTier(
    "Platinum",
    hre.ethers.parseEther("0.003"),
    30 * 24 * 60 * 60,
    { gasLimit: 500000 }
  );
  await tx3.wait();
  console.log("✅ Platinum tier created");

  console.log("\n🎉 Deployment complete!");
  console.log("Contract address:", address);
  console.log("\nAdd this to your .env.local:");
  console.log(`NEXT_PUBLIC_SUBSCRIPTION_NFT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });