
<script>
  export let message;
  export let sender;

  const messageClass = message.who === sender ? 'sent' : 'received';
  const avatar = "https://avatars.dicebear.com/api/initials/${message.who}.svg";
  const ts = new Date(message.when);
</script>

<div class={`message ${messageClass}`}>
  <img src={avatar} alt="avatar" class="avatar" />
  <div class="message-text">
    <p>{message.what}</p>
    <div class="timestamp">
      <time>{ts.toLocaleDateString()} {ts.toLocaleTimeString()}</time>
    </div>
  </div>
</div>

<style>
  .message {
    display: flex;
    margin: 10px;
  }
  .sent {
    justify-content: flex-end;
    color: green;
  }
  .received {
    justify-content: flex-start;
    color: blue;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .message-text {
    max-width: 300px;
    background: lightgray;
    padding: 10px;
    border-radius: 10px;
  }
  .timestamp {
    font-size: 0.8em;
    color: gray;
    text-align: right;
  }
</style>