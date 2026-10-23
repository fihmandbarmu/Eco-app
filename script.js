// --- Data: Planet Issues ---
const issues = [
  {
    title: "🌊 Ocean Plastic Pollution",
    description: "Millions of tons of plastic enter our oceans every year, harming marine wildlife, coral reefs, and ecosystem safety."
  },
  {
    title: "🌲 Deforestation",
    description: "Forests are being cleared rapidly for agricultural use and timber, causing loss of wildlife habitats and speeding up climate change."
  },
  {
    title: "🌡️ Global Climate Change",
    description: "Rising global temperatures due to greenhouse gases cause extreme weather events, rising ocean levels, and polar ice loss."
  },
  {
    title: "🐝 Loss of Biodiversity",
    description: "Species are disappearing at unprecedented rates due to human activity, disturbing the natural food webs essential for life."
  }
];

// --- Data: Eco Facts ---
const facts = [
  "Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
  "Rainforests produce over 20% of the world's oxygen supply.",
  "Over 8 million metric tons of plastic land in ocean waters each year.",
  "A single mature oak tree can absorb over 40 pounds of carbon dioxide annually.",
  "Composting organic waste can reduce landfill waste by up to 30%."
];

// --- Data: Quiz Questions ---
const quizData = [
  {
    question: "What percentage of the Earth's oxygen is produced by rainforests?",
    options: ["5%", "20%", "50%", "75%"],
    answer: 1
  },
  {
    question: "Which material takes hundreds of years to decompose in oceans?",
    options: ["Paper", "Glass", "Plastic", "Cotton"],
    answer: 2
  },
  {
    question: "What is a major cause of deforestation?",
    options: ["Agricultural Expansion", "Solar Power Plants", "Over-recycling", "Organic Farming"],
    answer: 0
  }
];

// --- Initialize Planet Issues ---
function loadIssues() {
  const container = document.getElementById("issues-grid");
  issues.forEach(issue => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${issue.title}</h3>
      <p>${issue.description}</p>
    `;
    container.appendChild(card);
  });
}

// --- Fact Generator ---
const factText = document.getElementById("fact-text");
const factBtn = document.getElementById("fact-btn");

factBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
});

// --- Quiz Logic ---
let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const quizResult = document.getElementById("quiz-result");
const nextBtn = document.getElementById("next-btn");

function loadQuiz() {
  quizResult.textContent = "";
  nextBtn.style.display = "none";
  
  const current = quizData[currentQuestion];
  questionText.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex) {
  const correctIndex = quizData[currentQuestion].answer;
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.style.backgroundColor = "#c8e6c9";
      btn.style.borderColor = "#2e7d32";
    } else if (idx === selectedIndex) {
      btn.style.backgroundColor = "#ffcdd2";
      btn.style.borderColor = "#d32f2f";
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    quizResult.textContent = "Correct! 🎉";
    quizResult.style.color = "#2e7d32";
  } else {
    quizResult.textContent = "Incorrect! ❌";
    quizResult.style.color = "#d32f2f";
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  questionText.textContent = `Quiz Completed! You scored ${score} out of ${quizData.length}.`;
  optionsContainer.innerHTML = "";
  quizResult.textContent = score === quizData.length ? "Perfect score! You are an eco-expert! 🌿" : "Keep learning to help protect our planet!";
  nextBtn.style.display = "none";
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  loadIssues();
  loadQuiz();
});
