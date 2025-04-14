<script>
  import { user, username } from './user';

  let inputUsername = '';
  let password = '';

  function login() {
    user.auth(inputUsername, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        username.set(inputUsername);
      }
    });
  }

  function signup() {
    user.create(inputUsername, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
</script>

<div class="login-container">
  <div class="login-card">
    <h1>👾 Welcome Back!</h1>
    <p class="greeting">Hey <strong>{inputUsername || 'friend'}</strong>, let’s get you in.</p>

    <label for="username">Username</label>
    <input
      name="username"
      placeholder="Enter your username"
      bind:value={inputUsername}
      minlength="3"
      maxlength="16"
    />

    <label for="password">Password</label>
    <input
      name="password"
      type="password"
      placeholder="Enter your password"
      bind:value={password}
    />

    <button class="primary" on:click={login}>Login</button>
    <button class="primary" on:click={signup}>Sign Up</button>
    <button class="secondary">Connect Wallet</button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  * {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #1e1e2f;
    color: #fff;
  }

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle at top, #2c2c4a, #1e1e2f);
  }

  .login-card {
    background: #2b2b3c;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(93, 68, 255, 0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: #a78bfa;
  }

  .greeting {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    color: #bbb;
  }

  label {
    display: block;
    text-align: left;
    margin: 0.5rem 0 0.2rem;
    color: #ddd;
    font-size: 0.85rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    border: none;
    margin-bottom: 1rem;
    background: #1f1f2f;
    color: white;
    outline: none;
    transition: 0.3s;
  }

  input:focus {
    border: 1px solid #7c3aed;
    box-shadow: 0 0 10px #7c3aed66;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    border-radius: 10px;
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .primary {
    background: #7c3aed;
    color: white;
    border: none;
  }

  .primary:hover {
    background: #a78bfa;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px #a78bfa55;
  }

  .secondary {
    background: transparent;
    border: 2px solid #7c3aed;
    color: #7c3aed;
  }

  .secondary:hover {
    background: #7c3aed22;
    color: #c4b5fd;
  }
</style>
