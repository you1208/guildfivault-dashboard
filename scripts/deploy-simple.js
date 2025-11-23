const hre = require("hardhat");

async function main() {
  console.log("Deploying simple version...");
  
  const Contract = await hre.ethers.getContractFactory("SubscriptionNFTSimple");
  const contract = await Contract.deploy();
  
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  
  console.log("✅ Deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});