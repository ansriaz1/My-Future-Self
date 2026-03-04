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

// 🌌 Future logic
let positivity = 0;

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if(!text) return;

    addMessage(text,"user");
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
    if(text.match(/start|discipline|learn|build/i)) positivity++;
    if(text.match(/later|lazy|quit|afraid/i)) positivity--;
}

// 🌟 Simple AI responses
function generateResponse(userMessage){
    addMessage("Thinking about our future...","future");

    setTimeout(()=>{
        chatBox.lastChild.remove(); // remove "Thinking..." message
        let response;
        if(userMessage.includes("?")) {
            response = "Hmm… I see. Let me think… " + ["Yes.", "No.", "Maybe.", "Absolutely.", "I wouldn't do that."].sort(()=>0.5-Math.random())[0];
        } else if(userMessage.match(/start|build|learn/i)) {
            response = "Good choice. Keep going, the future depends on it.";
        } else if(userMessage.match(/later|lazy|quit|afraid/i)) {
            response = "I see… procrastination has its cost, remember that.";
        } else {
            response = ["Interesting…","I remember that day…","That was a choice.","Keep that in mind."].sort(()=>0.5-Math.random())[0];
        }
        addMessage(response,"future");
    }, 1000);
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
