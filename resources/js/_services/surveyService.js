import {from} from "rxjs";

export const surveyService = {
    createSurvey,
};

function createSurvey(survey) {
    return from(axios.post("/api/surveys", survey));
}
