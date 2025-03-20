if (document.getElementById("form")) {
  let socket = io();
  let form = document.getElementById("form");
  let name = document.getElementById("name");
  let message = document.getElementById("message");
  let chatBox = document.getElementById("chatBox");

  let currentUserId = null;

  socket.on("connect", () => {
    currentUserId = socket.id; // Store current socket ID
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = { name: name.value.trim(), message: message.value.trim(), id: currentUserId };

    if (data.name && data.message) {
      socket.emit("send", data);
      message.value = ""; // Clear input after sending
    }
  });

  socket.on("receive", (data) => {
    let date = new Date();
    let time = date.toLocaleTimeString();
    let msgDiv = document.createElement("div");
    let msgSpan = document.createElement("div");

    msgDiv.classList.add("message-box");
    msgSpan.classList.add("text");

    let userClass = data.id === currentUserId ? "sent" : "received";
    
    msgSpan.innerHTML = `
      <div class="profile-name ${userClass}">
        <div>${data.name}</div>  
        <div>${time}</div>
      </div>
      <div class="message">${data.message}</div>
    `;

    msgDiv.appendChild(msgSpan);
    chatBox.appendChild(msgDiv);

    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
  });
}
