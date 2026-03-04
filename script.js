const chatBox = document.getElementById("chatBox");
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🌟 Cinematic star animation
let stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*2 });
}

function animateStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
        ctx.fill();
        star.y += 0.2;
        if(star.y>canvas.height) star.y=0;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// 🌌 Memory + Future logic
let positivity = 0;
let memory = []; // stores past user inputs

// Phrase pools
const motivational = [
    "Keep building, your future depends on it.",
    "Every step matters, don’t stop now.",
    "Discipline today, freedom tomorrow.",
    "Small actions compound into greatness.",
    "Your choices now shape your legacy.",
    "Focus on progress, not perfection.",
    "Consistency is your superpower.",
    "Remember why you started.",
    "Embrace challenge; it molds you.",
    "Take control, even when scared."
];

const warning = [
    "Procrastination is stealing your potential.",
    "Every delay is a lost opportunity.",
    "Fear will only slow you down.",
    "Ignoring your path leads to regret.",
    "The comfort you chase may trap you.",
    "Remember: future you is watching.",
    "Small bad habits compound into big mistakes.",
    "Avoid shortcuts; they lead nowhere.",
    "Lazy decisions today haunt tomorrow.",
    "Time lost cannot be regained."
];

const neutral = [
    "Interesting… tell me more.",
    "Hmm… I see.",
    "That’s a choice you made.",
    "I remember that day.",
    "Keep that in mind.",
    "The future is full of possibilities.",
    "Reflect on what you just said.",
    "Let’s think this through.",
    "Curiosity drives your actions.",
    "Your thoughts shape outcomes."
];

// Random utility
function pickRandom(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

// Main functions
function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if(!text) return;

    addMessage(text,"user");
    memory.push(text.toLowerCase());
    analyze(text);
    generateResponse(text);
    input.value="";
}

function addMessage(text,type){
    const msg = document.createElement("div");
    msg.className="message "+type;
    msg.innerText=text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    if(type==="future") speak(text);
}

function analyze(text){
    if(text.match(/start|discipline|learn|build|work|focus/i)) positivity++;
    if(text.match(/later|lazy|quit|afraid|delay|bored/i)) positivity--;
}

// 🌟 Rule-based AI with memory
function generateResponse(userMessage){
    addMessage("Thinking about your future...","future");

    setTimeout(()=>{
        chatBox.lastChild.remove(); // remove "Thinking..." message

        let responsePool = neutral;

        // Check for motivational keywords
        if(userMessage.match(/start|learn|build|focus|discipline|work/i)) {
            responsePool = motivational;
        } else if(userMessage.match(/later|lazy|quit|afraid|delay|bored/i)) {
            responsePool = warning;
        }

        // Check memory for repeated themes
        const repeats = memory.filter(m => m === userMessage.toLowerCase());
        if(repeats.length > 1){
            responsePool = warning; // if repeated, AI warns more strongly
        }

        // Combine two random phrases for variety
        const phrase1 = pickRandom(responsePool);
        const phrase2 = pickRandom(neutral);
        let finalResponse = phrase1 + " " + phrase2;

        addMessage(finalResponse,"future");

    }, 1200);
}

function generateReport(){
    let result;
    if(positivity>2) result="10 YEARS LATER: Success. Stability. Confidence.";
    else if(positivity<-2) result="10 YEARS LATER: Regret. Missed potential.";
    else result="10 YEARS LATER: Safe... but not extraordinary.";
    addMessage("=== FUTURE SIMULATION REPORT ===","future");
    addMessage(result,"future");
}

// 🎤 Voice input
function voiceInput(){
    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = function(e){
        document.getElementById("userInput").value=e.results[0][0].transcript;
    };
    recognition.start();
}

// 🔊 Voice output
function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate=0.85;
    speech.pitch=0.8;
    window.speechSynthesis.speak(speech);
}

// 🌑 Dark/Shift reality
function toggleDarkMode(){
    document.body.style.filter="invert(1) hue-rotate(180deg)";
}

// 👻 Scary viral mode
function activateScaryMode(){
    document.body.style.background="black";
    document.body.style.color="red";
    setTimeout(()=>{addMessage("I remember the day you ignored this warning.","future");},2000);
}

// 🔄 Reset everything
function resetAll(){
    location.reload();
}
