// metamaskStore.js
import { writable } from 'svelte/store';

export const account = writable(null);

// Function to check if MetaMask is available
export const checkMetaMask = () => {
  if (window.ethereum) {
    console.log("MetaMask is available.");
    return true;
  } else {
    console.log("MetaMask is not available.");
    return false;
  }
};

// Function to connect to MetaMask
export const connectMetaMask = async () => {
  if (!checkMetaMask()) {
    alert("Please install MetaMask to connect.");
    return;
  }

  try {
    // Request account access from MetaMask
    const [selectedAccount] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Set the account in the store
    account.set(selectedAccount);
    console.log("Connected with account:", selectedAccount);
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
};

// On page load, check if MetaMask is already connected
export const initializeAccount = async () => {
  if (checkMetaMask()) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      account.set(accounts[0]);
    }
  }
};
