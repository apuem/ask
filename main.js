const params = new URLSearchParams(window.location.search);
if (params.has("id") == true) {
    idParam = params.get("id");
    loadContent();
}
if (params.has("logged") == true) {
    loggedParam = params.get("logged");
    loadContent();
}
if (params.has("category") == true) {
    categoryParam = params.get("category");
    loadContent();
}

function loadQuestion(questionId) {

}

if (idParam != null) {
    id = idParam
    getQuestionbyId(id)
} else {
    getQuestionbyCategory(categoryParam)
}