var question;
var questionId;
var answeredQuestions;
var questionCategory;
var result;
var logged;
var points = 0;
var cookiesAccepted;
var questionById = false;
var q;

if (typeof Cookies.get('questionId') === "undefined") {
    setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
} else{
    getCookies();
}

/* if (questionCategory == "undefined") {
    questionCategory = "general";
} */

if (typeof questionCategory === 'undefined') {
    questionCategory = "general";
}

const getQcSelect = () => {
    qcSelect = document.getElementById('qcSelect');
    questionCategory = qcSelect.value;
    loadQuestion();
}

document.getElementById("qcSelect").onchange = getQcSelect;

getQcSelect();

/* if (typeof cookiesAccepted === 'undefined') {
    cookiesAccepted = confirm("Agree our cookies?");
} */

if (isNaN(points)) {
    points = 0;
}


/* if (answeredQuestions == "undefined") {
    answeredQuestions = JSON.stringify([0]);
} */

if (typeof answeredQuestions === 'undefined') {
    answeredQuestions = JSON.stringify(["0"]);
}


if (questionById == "undefined") {
    questionById = false;
}

setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);

updatePoints(0);

const params = new URLSearchParams(window.location.search);
if (params.has("id") == true) {
    questionId = params.get("id");
    questionById = true;
    console.log(questionById);
    console.log(questionId);
}

loadQuestion();

if (params.has("logged") == true) {
    logged = params.get("logged");
    logEvent(logged);
}
if (params.has("category") == true) {
    questionCategory = params.get("category");
}

function loadQuestion() {
    resetStyle();
    if (questionById == true) {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionById/" + questionId.toString());
    } else {
        question = httpGet("https://ask-api.vercel.app/api/getQuestionByCategory/" + questionCategory);
        
        
    }
        q = JSON.parse(question);
        questionId = q.id;
        result = q.solution;
        setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
        if (questionById == false) {
            checkForRevision();
        }
        questionById = false;
    

    setInput(q.question, q.id, q.answer1, q.answer2, q.answer3, q.answer4);
    window.scrollTo(0, 0);
}

function logEvent(answerField) {

    var clickOverlay = document.getElementById("click-overlay");

    if (answerField == q.solution) {
        setStatus(answerField, "correct", true);
        updatePoints(1);
        showSolutionDialog(answerField, true);
        addToAnsweredQuestions(q.id);
        setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
        clickOverlay.style.display = "block";
        clickOverlay.addEventListener('click', loadQuestion, true);

    } else {
        setStatus(answerField, "wrong", true);
        setStatus(q.solution, "correct", true);
        showSolutionDialog(answerField, true);
        addToAnsweredQuestions(q.id); // Wrong answeres questions will not be used again
        setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
        clickOverlay.style.display = "block";
        clickOverlay.addEventListener('click', loadQuestion, true);
    }
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted) {
    if (Cookies.get('cookieconsent_status') === "allow") {
        Cookies.set('questionId', questionId);
        Cookies.set('questionCategory', questionCategory);
        Cookies.set('answeredQuestions', JSON.stringify(answeredQuestions));
        Cookies.set('result', result);
        Cookies.set('logged', logged);
        Cookies.set('points', points.toString());
        Cookies.set('cookiesAccepted', cookiesAccepted);
    }
}

function getCookies() {
    questionId = Cookies.get('questionId');
    questionCategory = Cookies.get('questionCategory');
    answeredQuestions = JSON.parse(Cookies.get('answeredQuestions'));
    result = Cookies.get('result');
    logged = Cookies.get('logged');
    points = parseInt(Cookies.get('points'));
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

function setStatus(answerField, status, activator) {
    if (activator == true) {
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
    if (activator == false) {
        switch(status) {
            case "correct":
                var answerFieldElement = document.getElementById("answer" + answerField);
                answerFieldElement.style.backgroundColor = "#ffffff";
              break;
            case "wrong":
                var answerFieldElement = document.getElementById("answer" + answerField);
                answerFieldElement.style.backgroundColor = "#ffffff";
              break;
            case "deactivate":
                var answerFieldElement = document.getElementById("answer" + answerField);
                answerFieldElement.classList.add = "disable";
                break;
            default:
              // code block
          }
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
    window.location = window.location;
}

function addToAnsweredQuestions(value) {
    c = JSON.parse(answeredQuestions);
    c.push(value);
    answeredQuestions = JSON.stringify(c);
    setCookies(questionId, questionCategory, answeredQuestions, result, logged, points, cookiesAccepted);
}

function updatePoints(value) {

    var pointsText = document.getElementById("pointsText");
    points = parseInt(points, 10) + value;
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

    if (activator == true) {
        switch(solutionText) {
            case 1:
                solutionText1.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\" target=\"_blank\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText1.style.visibility = "visible";
                solutionText1.style.display = "block";
                solutionText1.style.opacity = "1";
              break;
            case 2:
                solutionText2.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\" target=\"_blank\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText2.style.visibility = "visible";
                solutionText2.style.display = "block";
                solutionText2.style.opacity = "1";
              break;
            case 3:
                solutionText3.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\" target=\"_blank\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText3.style.visibility = "visible";
                solutionText3.style.display = "block";
                solutionText3.style.opacity = "1";
                break;
            case 4:
                solutionText4.innerHTML = "Learn more about <a href=\"https://www.google.com/search?q=" + q.subject + "\" class=\"link-secondary\" target=\"_blank\"> " + q.subject + " </a> or click anywhere to continue."
                solutionText4.style.visibility = "visible";
                solutionText4.style.display = "block";
                solutionText4.style.opacity = "1";
                break;
            default:
              // code block
          }
    } 
    if (activator == false) {
        switch(solutionText) {
            case 1:
                solutionText1.style.visibility = "hidden";
                solutionText1.style.opacity = "0";
                break;
            case 2:
                solutionText2.style.visibility = "hidden";
                solutionText2.style.opacity = "0";
                break;
            case 3:
                solutionText3.style.visibility = "hidden";
                solutionText3.style.opacity = "0";
                break;
            case 4:
                solutionText4.style.visibility = "hidden";
                solutionText4.style.opacity = "0";
                break;
            default:
              // code block
          }
    } 
}

function checkForRevision() {
    var c = answeredQuestions;
    if (c.indexOf(q.id) !== -1) {
        loadQuestion();
    }
}

function resetStyle() {
    for (var i = 1; i < 5; i++) {
        showSolutionDialog(i, false);
    }
    for (var i = 1; i < 5; i++) {
        setStatus(i, "correct", false);
        setStatus(i, "false", false);
    }
    document.getElementById("click-overlay").style.display = "none";
}