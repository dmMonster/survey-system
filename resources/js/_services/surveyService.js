import {from, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

export const surveyService = {
    createSurvey,
    saveQuestion,
};

function createSurvey(survey) {
    return from(axios.post("/api/surveys", survey));
}

function saveQuestion(surveyId, questionText,questionType, answers = []) {
    return from(axios.post("/api/surveys/" + surveyId + "/questions", {
        question_text: questionText,
        type: questionType,
    } )).pipe(
        mergeMap((res) => {
            if(answers.length > 0) {
                return axios.post("/api/surveys/" + surveyId + "/questions/" + 1 +"/answers",{
                    answer_text: "test",
                    //TODO waiting for fix api endpoint
                })
            } else {
                return of(true);
            }
        })
    )
}
