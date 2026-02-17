const wordList = [
    { word: "addition", hint: "The process of adding numbers" },
    { word: "meeting", hint: "Event in which people come together" },
    { word: "number", hint: "Math symbol used for counting" },
    { word: "exchange", hint: "The act of trading" },
    { word: "canvas", hint: "Piece of fabric for oil painting" },
    { word: "garden", hint: "Space for planting flowers" },
    { word: "position", hint: "Location of someone or something" },
    { word: "feather", hint: "Hair-like outer covering of bird" },
    { word: "comfort", hint: "A pleasant feeling of relaxation" },
    { word: "tongue", hint: "The muscular organ of mouth" },
    { word: "expansion", hint: "The process of increase or growth" },
    { word: "country", hint: "A politically identified region" },
    { word: "group", hint: "A number of objects or persons" },
    { word: "taste", hint: "Ability of tongue to detect flavour" },
    { word: "store", hint: "Shop where goods are traded" },
    { word: "field", hint: "Area of land for farming" },
    { word: "friend", hint: "Person other than a family member" },
    { word: "pocket", hint: "A bag for carrying small items" },
    { word: "needle", hint: "A thin and sharp metal pin" },
    { word: "expert", hint: "Person with extensive knowledge" },
    { word: "statement", hint: "A declaration of something" },
    { word: "second", hint: "One-sixtieth of a minute" },
    { word: "library", hint: "Place with a collection of books" },
    { word: "ocean", hint: "Large body of salt water" },
    { word: "rocket", hint: "Vehicle used for space travel" },
    { word: "camera", hint: "Device for capturing images" },
    { word: "guitar", hint: "Stringed musical instrument" },
    { word: "planet", hint: "Large object orbiting a star" },
    { word: "island", hint: "Land surrounded by water" },
    { word: "bridge", hint: "Structure to cross water" },
    { word: "bottle", hint: "Container for liquids" },
    { word: "winter", hint: "The coldest season" },
    { word: "summer", hint: "The hottest season" },
    { word: "mobile", hint: "A portable telephone" },
    { word: "silver", hint: "A shiny precious metal" },
    { word: "yellow", hint: "The color of a sunflower" },
    { word: "school", hint: "Place where students learn" },
    { word: "market", hint: "Place for buying goods" },
    { word: "jungle", hint: "A dense tropical forest" },
    { word: "window", hint: "Opening in a wall for light" }
];

// Expanding to 100 words automatically for now
for(let i=1; i<=60; i++) {
    wordList.push({word: "example"+i, hint: "Practice word number "+i});
}

let correctWord, timer, score = 0, isMusicOn = false;

const scrambledWordText = document.getElementById("scrambledWord"),
    hintText = document.getElementById("hintText"),
    timeText = document.getElementById("timeLeft"),
    scoreText = document.getElementById("score"),
    inputField = document.getElementById("userInput"),
    refreshBtn = document.getElementById("refreshBtn"),
    checkBtn = document.getElementById("checkBtn"),
    musicBtn = document.getElementById("musicBtn"),
    bgMusic = document.getElementById("bgMusic");

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        // TIME OUT LOGIC - Reveals Answer
        alert(`TIME OVER! ⏰\nThe correct word was: ${correctWord.toUpperCase()}`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    let wordArray = randomObj.word.split("");
    
    // Scramble Logic
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    scrambledWordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.focus();
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase().trim();
    if(!userWord) return alert("Please enter a word!");
    
    if(userWord !== correctWord) {
        return alert(`Wrong! "${userWord}" is not correct.`);
    }
    
    score += 10;
    scoreText.innerText = score;
    alert(`Bravo! "${correctWord.toUpperCase()}" is correct. +10 Points!`);
    initGame();
}

// Controls
musicBtn.addEventListener("click", () => {
    isMusicOn = !isMusicOn;
    if(isMusicOn) {
        bgMusic.play();
        musicBtn.innerText = "🔊 Music: ON";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🔇 Music: OFF";
    }
});

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
inputField.addEventListener("keyup", (e) => e.key === "Enter" && checkWord());

initGame();

