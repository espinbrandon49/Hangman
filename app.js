const words = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie",
];

// the hidden word the condemned must guess letter by letter
const word = document.getElementById("word");
// container that holds the wrong guesses
const wrong = document.getElementById("wrong");
// bring out the next contestant
const playButton = document.getElementById("play-button");
// modal-like container to display the final sentence when the game ends
const popupContainer = document.getElementById("popup-container");
// notify that the letter has been guessed
const notificationContainer = document.getElementById("notification-container");
// displays the final verdict
const message = document.getElementById("message");
// collection of div.letter that comprise the hidden word
const letters = document.getElementsByClassName("letter");

const hiddenWord = words[Math.floor(Math.random() * words.length) + 1].split("");
let wrongGuesses = [];

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
      letters[i].classList.remove("hidden");
    }
  }
}

function wrongGuess() {
  switch (wrongGuesses.length) {
    case 1:
      document.getElementById("head").classList.add("see")
      break;
    case 2:
      document.getElementById("body").classList.add("see")
      break;
    case 3:
      document.getElementById("rightarm").classList.add("see")
      break;
    case 4:
      document.getElementById("leftarm").classList.add("see")
      break;
    case 5:
      document.getElementById("rightleg").classList.add("see")
      break;
    case 6:
      document.getElementById("leftleg").classList.add("see")
      message.textContent = "You lost and have been hanged!";
      popupContainer.style.display = "flex";
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
  if (document.getElementsByClassName("hidden").length == 0) {
    message.textContent = "Congratulations you win and have been pardoned!";
    popupContainer.style.display = "flex";
  }
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



