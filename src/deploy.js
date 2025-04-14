const { ethers } = require("ethers");

// Connect to Ganache (localhost:8545)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Private Key from your MetaMask (the one you imported in MetaMask)
const privateKey = "YOUR_PRIVATE_KEY_HERE";  // Replace with the private key you imported into MetaMask
const wallet = new ethers.Wallet(privateKey, provider);

// Your contract ABI and Bytecode (from Remix or Truffle)
const contractABI = [
  // Contract ABI goes here
];

const contractBytecode = "YOUR_CONTRACT_BYTECODE_HERE";  // Replace with actual bytecode of your contract

async function deploy() {
  const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
  console.log("Deploying contract...");
  
  const contract = await factory.deploy();  // Deploy the contract
  console.log("Contract deployed to:", contract.address);
  
  // Wait for deployment to finish
  await contract.deployTransaction.wait();
  
  console.log("Deployment transaction hash:", contract.deployTransaction.hash);
}

deploy();
