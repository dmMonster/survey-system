import {from, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

export const surveyService = {
    createSurvey,
    updateSurvey,
    saveQuestion,
    getMySurveys,
};

function getMySurveys() {
    return from(axios.get("/api/surveys"));
}

function createSurvey(survey) {
    return from(axios.post("/api/surveys", survey));
}

function updateSurvey(survey) {
    return from(axios.put("/api/surveys/" + survey.id, survey));
}

function saveQuestion(surveyId, questionText,questionType, answers = []) {
    return from(axios.post("/api/surveys/" + surveyId + "/questions", {
        question_text: questionText,
        type: questionType,
    } )).pipe(
        mergeMap(() => {
            if(answers.length > 0) {
                return axios.post("/api/surveys/" + surveyId + "/questions/" + 1 +"/answers",{
                    answers: JSON.stringify(answers),
                })
            } else {
                return of(true);
            }
        })
    )
}
