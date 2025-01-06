const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const opencampusverse = await ethers.getContractFactory("opencampusverse");
  const opencampusverse = await opencampusverse.deploy(deployer.address);
  await opencampusverse.deployed();

  console.log("opencampusverse deployed to:", opencampusverse.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 