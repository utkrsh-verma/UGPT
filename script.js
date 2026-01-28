const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// Send message on button click or Enter key
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => { if(e.key==="Enter") sendMessage(); });

async function sendMessage() {
  const text = input.value.trim();
  if(!text) return;
  input.value = "";

  // Show user message
  chatBox.innerHTML += `<div class="user">${text}</div>`;

  // Show bot typing animation
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.innerText = "UGPT is typing...";
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    botDiv.innerText = data.reply;
  } catch(err) {
    botDiv.innerText = "Backend not running ❌";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
