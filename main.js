var question;
var questionId;
var questionCategory;
var result;
var logged;
var cookiesAccepted;
var questionById = false;

getCookies();

if (cookiesAccepted == !true) {
    cookiesAccepted = confirm("Agree our cookies?");
    setCookies(questionId, questionCategory, result, logged, cookiesAccepted);
}

if (questionCategory == "undefined") {
    questionCategory = "general";
}

const params = new URLSearchParams(window.location.search);
if (params.has("id") == true) {
    id = params.get("id");
    questionById = true;
}
if (params.has("logged") == true) {
    logged = params.get("logged");
}
if (params.has("category") == true) {
    questionCategory = params.get("category");
}

setCookies(questionId, questionCategory, result, logged, cookiesAccepted);

loadQuestion();

function loadQuestion() {

    if (questionId == null) {
        nextQuestion();
    }
    if (questionById == false) {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionByCategory/" + questionCategory);
    } else {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionById/" + questionId);
    }

    var q = JSON.parse(question);

    setInput(q.question, q.id, q.answer1, q.answer2, q.answer3, q.answer4);
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/* if (idParam != null) {
    id = idParam;
    getQuestionbyId(id);
} else {
    getQuestionbyCategory(categoryParam)
} */

function setCookies(questionId, questionCategory, result, logged, cookiesAccepted) {
    Cookies.set('questionId', questionId);
    Cookies.set('questionCategory', questionCategory);
    Cookies.set('result', result);
    Cookies.set('logged', logged);
    Cookies.set('cookiesAccepted', cookiesAccepted);
}

function getCookies() {
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