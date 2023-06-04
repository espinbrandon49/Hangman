const words = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie",
];

// the letter guessed that isn't in the hidden word 
const wrong = document.getElementById("wrong");
// the hidden word the condemned must guess letter by letter
const word = document.getElementById("word");
// modal-like container to display final sentence at the end of the trial
const popupContainer = document.getElementById("popup-container");
// the final sentence
const message = document.getElementById("message");
// collection of div.letter that comprise the hidden word
const letters = document.getElementsByClassName("letter");
// collection of div.correct to use the state of correct guesses
const correct = document.getElementsByClassName("correct");
// bring out the next contestant
const playButton = document.getElementById("play-button");
// notifies the condemned if the letter has already been guesses
const notificationContainer = document.getElementById("notification-container");

const hiddenWord = words[Math.floor(Math.random() * words.length) + 1].split("");
let wrongGuesses = [];
let hangmanDraw = [];

function createHiddenWord() {
  hiddenWord.map(e => {
    word.innerHTML += `
    <span class="letter hidden">${e}</span/>
    `
  });
  console.log(hiddenWord);
}

function correctGuess(guess) {
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent == guess) {
      letters[i].classList.add("correct")
      letters[i].classList.remove("hidden");
    }
  }
}

function drawAppendage(num, str) {
  if (!hangmanDraw.includes(num)) {
    document.getElementById(str).classList.add("see")
    hangmanDraw.push(num);
  }
}

function wrongGuess() {
  let appendage;
  switch (wrongGuesses.length) {
    case 1:
      appendage = "head";
      drawAppendage(1, appendage);
      break;
    case 2:
      appendage = "body";
      drawAppendage(2, appendage);
      break;
    case 3:
      appendage = "leftarm";
      drawAppendage(3, appendage);
      break;
    case 4:
      appendage = "rightarm";
      drawAppendage(4, appendage);
      break;
    case 5:
      appendage = "leftleg";
      drawAppendage(5, appendage);
      break;
    case 6:
      appendage = "rightleg";
      drawAppendage(6, appendage);
      message.textContent = "You lost and have been hanged!";
      gameOver();
      break;
  };
}

function displayWrong(guess) {
  if ((!hiddenWord.includes(guess)) && (!wrongGuesses.includes(guess))) {
    document.getElementById("wrongTitle").textContent = "Wrong"
    wrongGuesses.push(guess);
  }
  wrong.textContent = wrongGuesses.map(e => " " + e);
}

function repeatedLetter(guess) {
  if (wrongGuesses.includes(guess)) {
    notificationContainer.classList.add("show")
  }
}

function win() {
  if (correct.length == hiddenWord.length) {
    message.textContent = "Congratulations you win and have been pardoned!";
    gameOver();
  }
}

function gameOver() {
  popupContainer.style.display = "flex";
}

playButton.addEventListener("click", () => window.location.reload());
window.addEventListener("keydown", (e) => {
  const guess = e.key;
  notificationContainer.classList.remove("show");
  if (/^[a-zA-Z]+$/.test(guess) && guess.length == 1) {
    repeatedLetter(guess);
    displayWrong(guess);
    wrongGuess();
    correctGuess(guess);
    win();
  }
});

createHiddenWord();



