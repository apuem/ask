var question;
var questionId;
var answeredQuestions = JSON.stringify([0, 0, 0]);
var questionCategory;
var result;
var logged;
var points = "0";
var cookiesAccepted;
var questionById = false;

getCookies();

if (cookiesAccepted == !true) {
    cookiesAccepted = confirm("Agree our cookies?");
    setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
}

if (questionCategory == "undefined") {
    questionCategory = "general";
}

if (points == "undefined") {
    points = "0";
}

setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);

loadQuestion();

updatePoints(0);

const params = new URLSearchParams(window.location.search);
if (params.has("id") == true) {
    id = params.get("id");
    questionById = true;
}
if (params.has("logged") == true) {
    logged = params.get("logged");
    logEvent(logged);
}
if (params.has("category") == true) {
    questionCategory = params.get("category");
}

function loadQuestion() {

    if (questionId == null) {
        nextQuestion();
    }
    if (questionById == false) {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionByCategory/" + questionCategory);
        checkForRevision();
    } else {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionById/" + questionId);
    }

    var q = JSON.parse(question);

    setInput(q.question, q.id, q.answer1, q.answer2, q.answer3, q.answer4);
}

function logEvent(answerField) {

    var q = JSON.parse(question);

    if (answerField == q.solution) {
        setStatus(answerField, "correct");
        updatePoints();
        showSolutionDialog(answerField, true);
        document.getElementById("answer" + answerField).addEventListener("click", nextQuestion);
    } else {
        setStatus(answerField, "wrong");
        setStatus(q.solution, "correct");
        showSolutionDialog(answerField, true);
    }
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/* if (idParam != null) {
    id = idParam;
    getQuestionbyId(id);
} else {
    getQuestionbyCategory(categoryParam)
} */

function setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted) {
    Cookies.set('questionId', questionId);
    Cookies.set('questionCategory', questionCategory);
    Cookies.set('answeredQuestions', answeredQuestions);
    Cookies.set('result', result);
    Cookies.set('logged', logged);
    Cookies.set('points', points);
    Cookies.set('cookiesAccepted', cookiesAccepted);
}

function getCookies() {
    questionId = Cookies.get('questionId');
    questionCategory = Cookies.get('questionCategory');
    answeredQuestions = Cookies.get('answeredQuestions');
    result = Cookies.get('result');
    logged = Cookies.get('logged');
    points = Cookies.get('points');
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
    questionIdText.innerHTML = "#" + convertFive(questionId);
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
            answerFieldElement.style.backgroundColor = "#dc618370";
          break;
        case "deactivate":
            var answerFieldElement = document.getElementById("answer" + answerField);
            answerFieldElement.classList.add = "disable";
            break;
        default:
          // code block
      }
}

function convertFive(raw) {
    return raw.padStart(5, 0);
}

function deconvertFive(raw) {
    return raw.toString().replace(/^0+/, '');
}

function nextQuestion() {
    setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
    window.location.href = "https://ask.apuem.com";
}

function addToAnsweredQuestions(value) {
    var c = JSON.parse(Cookies.get('answeredQuestions'));
    c.push(value);
    Cookies.set('answeredQuestions', JSON.stringify(c));
}

function checkUsedId() {

}

function updatePoints(value) {

    var pointsText = document.getElementById("pointsText");
    points = parseInt(points, 10) + 1;
    points = points.toString();
    pointsText.innerHTML = points + "p";
    setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
}

function showCookieDialog(activator) {
    
    var dialog = document.getElementById("dialog");
    if (activator == true) {
        dialog.style.display = "block";
    } 
    if (activator == false) {
        dialog.style.display = "none";
    } 
}

function showSolutionDialog(solutionText, activator) {
    var solutionText1 = document.getElementById("solutionText1");
    var solutionText2 = document.getElementById("solutionText2");
    var solutionText3 = document.getElementById("solutionText3");
    var solutionText4 = document.getElementById("solutionText4");

    var q = JSON.parse(question);

    if (activator == true) {
        switch(solutionText) {
            case 1:
                solutionText1.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText1.style.visibility = "visible";
                solutionText1.style.opacity = "1";
              break;
            case 2:
                solutionText2.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText2.style.visibility = "visible";
                solutionText2.style.opacity = "1";
              break;
            case 3:
                solutionText3.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText3.style.visibility = "visible";
                solutionText3.style.opacity = "1";
                break;
            case 4:
                solutionText4.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText4.style.visibility = "visible";
                solutionText4.style.opacity = "1";
                break;
            default:
              // code block
          }
    } 
    if (activator == false) {
        switch(solutionText) {
            case 1:
                solutionText1.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText1.style.visibility = "hidden";
                solutionText1.style.opacity = "0";
              break;
            case 2:
                solutionText2.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText2.style.visibility = "hidden";
                solutionText2.style.opacity = "0";
              break;
            case 3:
                solutionText3.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText3.style.visibility = "hidden";
                solutionText3.style.opacity = "0";
                break;
            case 4:
                solutionText4.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText4.style.visibility = "hidden";
                solutionText4.style.opacity = "0";
                break;
            default:
              // code block
          }
    } 
}

function checkForRevision() {
    var q = JSON.parse(question);
    var c = JSON.parse(Cookies.get('answeredQuestions'));
    if(c.indexOf(q.id) !== -1) {
        nextQuestion();
    }
}