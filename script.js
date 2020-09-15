(function () {
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (const letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label class="radio">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="field">
          <label class="label">${currentQuestion.question}</label>
          <div class="control answers">${answers.join("")}</div>
        </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults(event) {
    // prevent form submission
    event.preventDefault();

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // get user name
    const userName = document.querySelector('[name="name"]');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    const notificationIs =
      numCorrect === myQuestions.length
        ? "success"
        : numCorrect === myQuestions.length - 1
        ? "warning"
        : "danger";
    const encouragingPhrase =
      numCorrect === myQuestions.length
        ? "Outstanding"
        : numCorrect === myQuestions.length - 1
        ? "Almost there"
        : "Try again";
    resultsContainer.innerHTML = `<div class="notification is-${notificationIs} is-light">
      ${encouragingPhrase}, <strong>${userName.value}</strong>!
      You guessed ${numCorrect} out of ${myQuestions.length}.
    </div>`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const form = document.getElementById("form");
  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
      },
      correctAnswer: "c",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
      },
      correctAnswer: "d",
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  form.addEventListener("submit", showResults);
})();
