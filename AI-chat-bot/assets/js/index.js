

      // 🌙 Persist theme
      const theme = localStorage.getItem("theme") || "light";
      document.body.className = theme;

      // 🌓 Toggle Theme
      function toggleTheme() {
        const newTheme = document.body.className === "dark" ? "light" : "dark";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);

        // Update existing messages' theme classes
        document.querySelectorAll(".message").forEach((msg) => {
          msg.classList.remove("light", "dark");
          msg.classList.add(newTheme);
        });
      }

      // 🗨️ Handle Message Sending
      function sendMessage() {
        const chat = document.getElementById("chat");
        const message = input.value.trim();
        const theme = document.body.className;

        if (!message) return;

        // Add user message
        const userMsg = document.createElement("div");
        userMsg.className = `message user ${theme}`;
        userMsg.textContent = message;
        chat.appendChild(userMsg);

        // Create bot message placeholder
        const botMsg = document.createElement("div");
        const bodmsg = document.createElement("p");
        botMsg.className = `message bot ${theme}`;
        bodmsg.textContent = "🤖 Thinking...";
        bodmsg.style.marginBottom = "10px";
        botMsg.appendChild(bodmsg);
        chat.appendChild(botMsg);
        chat.scrollTop = chat.scrollHeight;

        async function getMessage() {
          const response = await fetch(
            "http://localhost:8081/api/gemini/chat",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: message,
              }),
            }
          );

          const data = await response.json();

          for (let i = 0; i < data.reply.length; i++) {
            setTimeout(() => {
              const div = document.createElement("p");
              div.textContent = data.reply[i];
              botMsg.appendChild(div);
              chat.scrollTop = chat.scrollHeight;
            }, 1000);
          }
        }

        getMessage();

        input.value = "";
        chat.scrollTop = chat.scrollHeight;
      }

      const input = document.getElementById("userInput");

      const sendButton = document.getElementById("sendbtn");
      sendButton.addEventListener("click", sendMessage);
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          sendMessage();
        }
      });