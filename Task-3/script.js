const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Machine Language", "Hyperlink and Text Management Language"],
    correct: 0
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-style", "text-color", "color"],
    correct: 2
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "React", "Django"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const jokeEl = document.getElementById("joke");
const finalResultEl = document.getElementById("finalResult");

function loadQuestion() {
  let q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  jokeEl.textContent = "";

  q.options.forEach((opt, index) => {
    let label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${index}"><span>${opt}</span>`;
    optionsEl.appendChild(label);
  });
}

submitBtn.addEventListener("click", () => {
  let selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  let selectedIndex = parseInt(selected.value);

  if (selectedIndex === quizData[currentQuestion].correct) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.className = "feedback correct";
    score++;
  } else {
    feedbackEl.textContent = "❌ Wrong!";
    feedbackEl.className = "feedback wrong";
  }

  // Fetch a joke for every question
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeEl.textContent = `😂 ${data.setup} - ${data.punchline}`;
    })
    .catch(() => {
      jokeEl.textContent = "Couldn't fetch a joke this time!";
    });

  // Go to next question after 3 seconds
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 3000);
});

function showFinalResult() {
  document.getElementById("quiz").style.display = "none";
  finalResultEl.style.display = "block";
  finalResultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}

// Start first question
loadQuestion();
