window.onload = function() {
    alert(" HAPPY GANESH CHATURTHI! Welcome to the Quiz!");
};
const questions = [
    { question: "Who is the Convenor of Zairza?", choices: ["Subham Bhai", "Vaishnav Bhai", "Harsh Bhai", "Suraj Bhai"], correctAnswer: 1 },
    { question: "Who is the Coordinator of Zairza?", choices: ["Harsh Bhai", "Subham Bhai", "Bivraj Bhai", "Abhinaba Bhai"], correctAnswer: 1 },
    { question: "Which title fits Suraj Bhai?", choices: ["Laal", "Paal", "Maal", "Kaal"], correctAnswer: 2 }
];
let currentQuestionIndex = 0;
let score = 0;
let answers = new Array(questions.length).fill(null);
const quizContainer = document.getElementById('quiz');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const scoreContainer = document.getElementById('score-container');
const questionNav = document.getElementById('question-nav');
submitBtn.classList.add('hidden');
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h3>Question: ${questionData.question}</h3>
        <div class="options-container">
            ${questionData.choices.map((choice, index) => `
             <div class="option-box" data-index="${index}">
              ${choice}
            </div>
        `).join('')}
        </div>`;
    updateNav();
    handleOptionClick();
}
function handleOptionClick() {
    const optionBoxes = document.querySelectorAll('.option-box');
    optionBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const selectedIndex = parseInt(box.getAttribute('data-index'));
            answers[currentQuestionIndex] = selectedIndex;
            updateNav();
  });
  });
}

function updateScore() {
    let finalScore = 0;
    answers.forEach((answer, index) => {
        if (answer !== null && answer === questions[index].correctAnswer) {     finalScore += 1;
        }
    });
scoreContainer.innerText = `Your Score: ${finalScore}/${questions.length}`;
}

function updateNav() {
    questionNav.innerHTML = questions.map((_, index) => `
      <button class="${answers[index] !== null ? 'answered' : ''}" onclick="goToQuestion(${index})">
        ${index + 1}
    </button>
    `).join('');}
function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
       currentQuestionIndex++;
        loadQuestion();
    }

    if (currentQuestionIndex === questions.length - 1) {
       nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
  }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
     loadQuestion();
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
});
submitBtn.addEventListener('click', () => {
    updateScore();
    quizContainer.classList.add('hidden');
    prevBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
});loadQuestion();
