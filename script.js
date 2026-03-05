// -------------------- Updated script.js --------------------

const apiKey = "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"; // your API key
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Greeting keywords
const greetings = ["hi", "hello", "hey", "assalamualaikum", "salam"];

// Check if user message is a greeting
function isGreeting(message) {
    message = message.toLowerCase();
    return greetings.some(greet => message.includes(greet));
}

// Send message to AI API
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    displayMessage("You: " + message, "user");
    userInput.value = "";

    // Prepare system message to make AI remember your name
    const systemMessage = `
You are an AI assistant named Ans.
Always remember your name is Ans and you are the user's personal AI assistant.
When greeting the user or introducing yourself, vary your sentences naturally.
Be friendly, helpful, and conversational.
`;

    // Prepare messages for API
    const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
    ];

    // Optional: If message is a greeting, nudge AI to greet warmly
    if (isGreeting(message)) {
        messages.push({ role: "user", content: "Greet the user warmly and introduce yourself naturally." });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
            })
        });

        const data = await response.json();
        const aiReply = data.choices[0].message.content;

        displayMessage("Ans: " + aiReply, "bot");

    } catch (err) {
        displayMessage("Ans: Sorry, something went wrong 😔", "bot");
        console.error(err);
    }
}

// Display message in chat box
function displayMessage(message, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "userMessage" : "botMessage";
    msg.innerText = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send on button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
