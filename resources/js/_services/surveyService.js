import {forkJoin, from, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

export const surveyService = {
    createSurvey,
    updateSurvey,
    saveQuestion,
    getMySurveys,
    getSurveyQuestions,
    updateQuestion,
    deleteQuestion,
    deleteSurvey,
    startSurvey,
    collectAnswers,
    getSurveyResult,
    getRespondents,
    saveRating,
};

function getMySurveys() {
    return from(axios.get("/api/surveys"));
}

function startSurvey(token) {
    return from(axios.get("/api/surveys/" + token + "/start"));
}

function collectAnswers(responses, surveyId) {
    return from(axios.post("/api/results", {
        responses: responses,
        survey_id: surveyId,
    }));
}

function getSurveyQuestions(surveyId) {
    return from(axios.get("/api/surveys/" + surveyId + "/questions"));
}

function createSurvey(survey) {
    return from(axios.post("/api/surveys", survey));
}

function updateSurvey(survey) {
    return from(axios.put("/api/surveys/" + survey.id, survey));
}

function saveQuestion(surveyId, questionText, questionType, answers = []) {
    return from(axios.post("/api/surveys/" + surveyId + "/questions", {
        question_text: questionText,
        type: questionType,
    })).pipe(
        mergeMap((createdQuestion) => {
            if (answers.length > 0) {
                return axios.post("/api/questions/" + createdQuestion.data.id + "/answers", {
                    answers: JSON.stringify(answers),
                })
            } else {
                return of(true);
            }
        })
    )
}

function deleteSurvey(id) {
    return from(axios.delete("/api/surveys/" + id));
}

function updateQuestion(questionId, questionText, questionType, answers = []) {
    return forkJoin({
        question: from(axios.put("/api/questions/" + questionId, {
            question_text: questionText,
            type: questionType,
        })),

        answers: from(axios.put("/api/questions/" + questionId + "/answers", {
            answers: JSON.stringify(answers),
        })),
    });
}

function deleteQuestion(id) {
    return from(axios.delete("/api/questions/" + id));
}

function getSurveyResult(id) {
    return from( axios.get('/api/surveys/' + id + '/results'));
}

function getRespondents(surveyId) {
    return from( axios.get('/api/surveys/' + surveyId +'/respondents'));
}

function saveRating(surveyToken, rating, description) {
    return from(axios.post('/api/surveys/' + surveyToken + '/ratings', {
        rating: rating,
        description: description,
    }));
}
