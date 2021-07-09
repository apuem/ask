var questionId;
var questionCategory;
var result;
var logged;
var cookiesAccepted;

const params = new URLSearchParams(window.location.search);
if (params.has("id") == true) {
    id = params.get("id");
    loadContent();
}
if (params.has("logged") == true) {
    logged = params.get("logged");
    loadContent();
}
if (params.has("category") == true) {
    questionCategory = params.get("category");
    loadContent(questionId, );
}

function loadQuestion() {
    setCookies(questionId, questionCategory, result, logged, cookiesAccepted);
}

if (idParam != null) {
    id = idParam;
    getQuestionbyId(id);
} else {
    getQuestionbyCategory(categoryParam)
}

function setCookies(questionId, questionCategory, result, logged, cookiesAccepted) {
    Cookies.set('questionId', questionId);
    Cookies.set('questionCategory', questionCategory);
    Cookies.set('result', result);
    Cookies.set('logged', logged);
    Cookies.set('cookiesAccepted', logged);
}

function getCookies(questionId, questionCategory, result, logged, cookiesAccepted) {
    questionId = Cookies.get('questionId');
    questionCategory = Cookies.get('questionCategory');
    result = Cookies.get('result');
    logged = Cookies.get('logged');
    cookiesAccepted = Cookies.get('cookiesAccepted');
}

function setInput(question, questionId, answer1, answer2, answer3, answer4) {
    var questionText = document.getElementById("questionText");
    var questionIdText = document.getElementById("questionIdText");
    var answer1Text = document.getElementById("answer1Text");
    var answer2Text = document.getElementById("answer2Text");
    var answer3Text = document.getElementById("answer3Text");
    var answer4Text = document.getElementById("answer4Text");
    questionText.innerHTML = question;
    questionIdText.innerHTML = questionId;
    answer1Text.innerHTML = answer1;
    answer2Text.innerHTML = answer2;
    answer3Text.innerHTML = answer3;
    answer4Text.innerHTML = answer4;
}

function setStatus(answerField, status) {
    switch(status) {
        case "correct":
            var answerFieldElement = document.getElementById("answer" + answerField);
            answerFieldElement.style.backgroundColor = "#beffcf66";
          break;
        case "wrong":
            var answerFieldElement = document.getElementById("answer" + answerField);
            answerFieldElement.style.backgroundColor = "#beffcf66";
          break;
        case "deactivate":
            var answerFieldElement = document.getElementById("answer" + answerField);
            answerFieldElement.classList.add = "disable";
            break;
        default:
          // code block
      }
}