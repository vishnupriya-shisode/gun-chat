import { ethers } from 'ethers';
import { writable } from 'svelte/store';

export const account = writable(null);
export const provider = writable(null);

export async function connectWallet() {
  if (window.ethereum) {
    try {
      // Create a provider to interact with MetaMask
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the signer (the current connected account in MetaMask)
      const signer = await ethProvider.getSigner();

      // Get the account address
      const address = await signer.getAddress();

      // Set the account and provider in the store
      provider.set(ethProvider);
      account.set(address);

      console.log("Connected account:", address);
    } catch (err) {
      console.error("User rejected connection", err);
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask.");
  }
}
