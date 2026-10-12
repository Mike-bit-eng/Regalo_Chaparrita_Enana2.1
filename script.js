
const questions = [
  {
    question: "¿Cuál es la fecha en que comenzamos nuestra relación?",
    answers: [
      { text: "25 de diciembre de 2024", correct: true },
      { text: "29 de noviembre de 2024", correct: false },
      { text: "14 de febrero de 2025", correct: false },
      { text: "25 de diciembre de 2025", correct: false },
      { text: "25 de noviembre de 2024", correct: false }
    ]
  },
  {
    question: "¿Cuál es la comida favorita de Mike?",
    answers: [
      { text: "Wraps", correct: true },
      { text: "Pupusas", correct: false },
      { text: "Pizza", correct: false },
      { text: "Hamburguesas", correct: false },
      { text: "Tacos", correct: false }
    ]
  },
  {
    question: "¿Cuándo es el cumpleaños de Mike?",
    answers: [
      { text: "7 de octubre", correct: true },
      { text: "8 de octubre", correct: false },
      { text: "7 de noviembre", correct: false },
      { text: "17 de octubre", correct: false },
      { text: "7 de diciembre", correct: false }
    ]
  },
  {
    question: "¿Qué está estudiando Mike?",
    answers: [
      {
        text: "Ingeniería en Sistemas y Ciberseguridad",
        correct: true
      },
      {
        text: "Ingeniería Industrial",
        correct: false
      },
      {
        text: "Licenciatura en Informática",
        correct: false
      },
      {
        text: "Ingeniería Electrónica",
        correct: false
      },
      {
        text: "Ingeniería Civil",
        correct: false
      }
    ]
  },
  {
    question: "¿Cuál es el juego favorito de Mike?",
    answers: [
      { text: "Cuphead", correct: true },
      { text: "Minecraft", correct: false },
      { text: "Hollow Knight", correct: false },
      { text: "Stardew Valley", correct: false },
      { text: "Celeste", correct: false }
    ]
  },
  {
    question: "¿En qué departamento vive Mike?",
    answers: [
      { text: "La Libertad", correct: true },
      { text: "San Salvador", correct: false },
      { text: "Santa Ana", correct: false },
      { text: "Sonsonate", correct: false },
      { text: "La Paz", correct: false }
    ]
  },
  {
    question: "¿A qué le tiene miedo Mike?",
    answers: [
      { text: "A los chacuatetes", correct: true },
      { text: "A las cucarachas", correct: false },
      { text: "A las arañas", correct: false },
      { text: "A los ratones", correct: false },
      { text: "A los murciélagos", correct: false }
    ]
  },
  {
    question: "¿Cuál es el apodo favorito de Mike?",
    answers: [
      { text: "Mi príncipe hermoso", correct: true },
      { text: "Cachorrito", correct: false },
      { text: "Mimi", correct: false },
      { text: "Mi niño", correct: false },
      { text: "Mi vida", correct: false }
    ]
  },
  {
    question: "¿En qué universidad estudia Mike?",
    answers: [
      {
        text: "Universidad Francisco Gavidia",
        correct: true
      },
      {
        text: "Universidad de El Salvador",
        correct: false
      },
      {
        text: "Universidad Centroamericana José Simeón Cañas",
        correct: false
      },
      {
        text: "Universidad Don Bosco",
        correct: false
      },
      {
        text: "Universidad Dr. José Matías Delgado",
        correct: false
      }
    ]
  },
  {
    question: "¿Cuál es la serie favorita de Mike?",
    answers: [
      { text: "Rick y Morty", correct: true },
      { text: "BoJack Horseman", correct: false },
      { text: "Los Simpson", correct: false },
      { text: "Hora de Aventura", correct: false },
      { text: "Gravity Falls", correct: false }
    ]
  }
];

// Elementos de la página
const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const retryBtn = document.getElementById("retryBtn");

const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const selectionHint = document.getElementById("selectionHint");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const scoreElement = document.getElementById("score");
const loveLetter = document.getElementById("loveLetter");
const retryMessage = document.getElementById("retryMessage");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let shuffledQuestions = [];

// Mezcla una lista sin favorecer una posición.
function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// Inicia el examen o un nuevo intento.
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;

  // Mezclamos el orden de las preguntas y las respuestas.
  shuffledQuestions = shuffle(
    questions.map(question => ({
      ...question,
      answers: shuffle(question.answers)
    }))
  );

  welcome.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Dibuja la pregunta actual.
function renderQuestion() {
  selectedAnswer = null;
  nextBtn.disabled = true;

  const question = shuffledQuestions[currentQuestion];

  counter.textContent =
    `Pregunta ${currentQuestion + 1} de ${shuffledQuestions.length}`;

  progress.style.width =
    `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`;

  questionText.textContent = question.question;
  answersContainer.replaceChildren();

  selectionHint.textContent =
    "Toca la respuesta que consideres correcta.";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = answer.text;

    button.append(letter, text);

    button.addEventListener("click", () => {
      selectAnswer(button, answer);
    });

    answersContainer.appendChild(button);
  });
}

// Permite seleccionar una única respuesta.
function selectAnswer(button, answer) {
  selectedAnswer = answer;

  answersContainer.querySelectorAll(".answer-btn").forEach(option => {
    option.classList.remove("selected");
    option.setAttribute("aria-pressed", "false");
  });

  button.classList.add("selected");
  button.setAttribute("aria-pressed", "true");

  nextBtn.disabled = false;
  selectionHint.textContent = "Respuesta seleccionada 💗";
}

// Comprueba la respuesta y avanza.
function nextQuestion() {
  if (selectedAnswer === null) return;

  if (selectedAnswer.correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < shuffledQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// Muestra el resultado final.
function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  scoreElement.textContent = score;

  const passed = score >= 9;

  loveLetter.classList.add("hidden");
  retryMessage.classList.add("hidden");
  retryBtn.classList.add("hidden");

  if (passed) {
    resultIcon.textContent = "🎉💖🌸";
    resultTitle.textContent = "¡APROBADA, MI PRINCESA!";
    resultText.textContent =
      `¡Sacaste ${score}/10! Mi chaparrita hermosa, ` +
      "lograste desbloquear tu sorpresa. 💖✨";

    loveLetter.classList.remove("hidden");
    createCelebration();
  } else {
    resultIcon.textContent = "💗";
    resultTitle.textContent = "¡Un intentito más, mi niña!";
    resultText.textContent =
      `Obtuviste ${score}/10. Necesitas al menos 9/10 ` +
      "para desbloquear tu mensaje especial.";

    retryMessage.classList.remove("hidden");
    retryBtn.classList.remove("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Celebración con corazones y flores.
function createCelebration() {
  const symbols = ["💖", "🌸", "💕", "✨", "🌷"];

  for (let i = 0; i < 32; i++) {
    const item = document.createElement("span");
    item.className = "petal";
    item.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${14 + Math.random() * 18}px`;
    item.style.animationDuration = `${4 + Math.random() * 5}s`;
    item.style.animationDelay = `${Math.random() * 2}s`;

    document.getElementById("petals").appendChild(item);

    // Eliminamos cada elemento después de su animación.
    setTimeout(() => item.remove(), 12000);
  }
}

// Pétalos decorativos de fondo.
function createBackgroundPetals() {
  const container = document.getElementById("petals");
  const symbols = ["🌸", "✿", "❀"];

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[i % symbols.length];

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${12 + Math.random() * 12}px`;
    petal.style.animationDuration = `${9 + Math.random() * 12}s`;
    petal.style.animationDelay = `${Math.random() * -15}s`;

    container.appendChild(petal);
  }
}

// Eventos
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
retryBtn.addEventListener("click", startQuiz);

createBackgroundPetals();
