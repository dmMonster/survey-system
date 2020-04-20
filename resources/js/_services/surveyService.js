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
};

function getMySurveys() {
    return from(axios.get("/api/surveys"));
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

function updateQuestion(questionId, questionText, questionType, answers = []) {
    return forkJoin({
        question: from(axios.put("/api/questions/" + questionId, {
            question_text: questionText,
            type: questionType,
        })),

        answers: from(axios.put("/api/questions/" + questionId + "/answers",{
            answers: JSON.stringify(answers),
        })),
    });
}

function deleteQuestion(id) {
    return from(axios.delete("/api/questions/" + id));
}
