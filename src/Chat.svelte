<script>
  import { username } from './user';
  import { onMount } from 'svelte';
  import { ethers } from 'ethers';
  import debounce from 'lodash.debounce';
  import Login from './Login.svelte';
  import ChatMessage from './ChatMessage.svelte';

  let newMessage = "";
  let messages = [];
  let scrollBottom;
  let lastScrollTop = 0;
  let canAutoScroll = true;
  let unreadMessages = false;
  let provider, signer, contract;

  const contractAddress = "0x36a90cC9951f55889bF535569Cb72D36e3E1aF6c";
  const abi = [
    "function sendMessage(string sender, string message) public",
    "function getMessages() public view returns (tuple(string, string, uint256)[])"
  ];

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        username.set(account);

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("🦊 Connected wallet:", account);
        console.log("✅ Contract ready:", contract);
      } catch (err) {
        console.error("❌ MetaMask connection failed:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function getMessages() {
    if (!contract) await connectWallet();

    try {
      const messagesFromChain = await contract.getMessages();

      messages = messagesFromChain.map(msg => ({
        who: msg[0],
        what: msg[1],
        when: Number(msg[2]) * 1000  // Convert to milliseconds
      })).sort((a, b) => a.when - b.when);

      if (canAutoScroll) {
        autoScroll();
      } else {
        unreadMessages = true;
      }

    } catch (error) {
      console.error("⚠️ Error fetching messages:", error);
    }
  }

  async function sendMessage() {
    const currentUsername = $username;
    if (!contract || !currentUsername || !newMessage.trim()) return;

    try {
      const tx = await contract.sendMessage(currentUsername, newMessage.trim());
      await tx.wait();
      console.log("📤 Message sent:", newMessage);
      newMessage = "";
      canAutoScroll = true;
      getMessages(); // Refresh the chat after sending
    } catch (error) {
      console.error("⚠️ Error sending message:", error);
    }
  }

  function autoScroll() {
    setTimeout(() => {
      scrollBottom?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    unreadMessages = false;
  }

  function watchScroll(e) {
    canAutoScroll = (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 50);
    lastScrollTop = e.target.scrollTop;
  }

  $: debouncedWatchScroll = debounce(watchScroll, 1000);

  onMount(() => {
    connectWallet();
    getMessages();
    setInterval(getMessages, 5000);

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        username.set(accounts[0]);
        await connectWallet();
        await getMessages();
      });
    }
  });
</script>

<style>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
    overflow-y: auto;
  }
  form {
    display: flex;
    padding: 10px;
    gap: 10px;
  }
  input {
    flex: 1;
    padding: 10px;
  }
  button {
    padding: 10px;
  }
  .scroll-button {
    position: fixed;
    bottom: 70px;
    right: 20px;
  }
</style>

<div class="container">
  {#if $username}
    <main on:scroll={debouncedWatchScroll}>
      {#each messages as message (message.when)}
        <ChatMessage {message} sender={$username} />
      {/each}
      <div class="dummy" bind:this={scrollBottom} />
    </main>

    <form on:submit|preventDefault={sendMessage}>
      <input
        type="text"
        placeholder="Type a message..."
        bind:value={newMessage}
        maxlength="100"
      />
      <button type="submit" disabled={!newMessage.trim()}>SEND TO 🦊</button>
    </form>

    {#if !canAutoScroll}
      <div class="scroll-button">
        <button on:click={autoScroll} class:red={unreadMessages}>
          {#if unreadMessages} 💬 {/if} 👇
        </button>
      </div>
    {/if}
  {:else}
    <main>
      <Login />
      <button on:click={connectWallet}>Connect Wallet</button>
    </main>
  {/if}
</div>
