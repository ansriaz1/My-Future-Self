// ===============================
// AI Request using Groq API
// ===============================

const GROQ_API_KEY = "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";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// Function to send message to AI
async function sendMessageToAI(userMessage) {
  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 200
      })
    });

    const data = await response.json();
    return data.choices[0].message.content; // AI's reply
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "Oops! Something went wrong. Try again.";
  }
}

// Handle user input
document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  // Show user's message
  document.getElementById("chatBox").innerHTML += `<p><b>You:</b> ${userInput}</p>`;

  // Clear input box
  document.getElementById("userInput").value = "";

  // Get AI reply
  const aiReply = await sendMessageToAI(userInput);

  // Show AI reply
  document.getElementById("chatBox").innerHTML += `<p><b>AI:</b> ${aiReply}</p>`;

  // Scroll to bottom
  const chatBox = document.getElementById("chatBox");
  chatBox.scrollTop = chatBox.scrollHeight;
});
