import React, {useEffect, useState} from 'react';
import Chart from "../chart/Chart";
import AnswersList from "../surveyResultAnswersList/AnswersList";


const SurveyResult = () => {

    const [questions, setQuestions] = useState(null);
    useEffect(() => {
        axios.get('/api/results').then((response) => {
            console.log(response.data);
            setQuestions(response.data.questions);
        })
    }, []);

    return (
        <div>
            {questions && (
                questions.map(question => {
                    return (
                        <div key={question.id}>
                            {question.type !== 'text' ? (
                                    <Chart title={question.question_text}
                                           labels={question.answers.map(v => v.answer_text)}
                                           dataset={question.answers.map(v => v.given_answers_count)}/>)
                                : <AnswersList question={question.question_text} answers={question.text_answers.map(v => v.text_answer)}/>
                            }
                        </div>
                    )
                })
            )}


        </div>
    );
};

export default SurveyResult;
