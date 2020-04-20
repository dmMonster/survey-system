import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './editQuestion.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

function EditQuestion(props) {

    const answersNumber = props.currentQuestion ? props.currentQuestion.answers.length : 2;
    const initialAnswers = [];
    for (let i = 0; i < answersNumber; i++) {
        initialAnswers.push({id: i});
    }

    const [answers, setAnswer] = useState(initialAnswers);

    const answersList = answers.map((answer, id) => {
        return (
            <div key={answer.id} className="d-flex align-items-center">
                <input name={"answer"} className="answer" type="text" required={true}
                       defaultValue={props.currentQuestion && props.currentQuestion.answers[id] ? props.currentQuestion.answers[id].answer_text : "Your answer..."} onFocus={(e) => {
                    e.target.select()
                }}/>
                <div style={{cursor: "pointer"}} onClick={() => deleteAnswer(answer.id)}>
                    <FontAwesomeIcon icon={faTrash} color={"#df5252"} size={"2x"}/>
                </div>
            </div>
        )
    });


    const addAnswer = (e) => {
        e.preventDefault();
        setAnswer(
            [...answers, {id: (new Date().getTime())}]
        );

    };

    function deleteAnswer(answerId) {
        let newAnswers = [];
        for (let answer of answers) {
            if (answer.id !== answerId) {
                newAnswers.push(answer);
            }
        }
        setAnswer(newAnswers);
    }

    const answersSection = (
        <div className="answers">
            <div>
                {answersList}
                <button className="btn btn-outline-info" onClick={addAnswer}>Add answer</button>
            </div>
        </div>
    );

    const saveForm = e => {
        e.preventDefault();
        let formData = new FormData(e.target);
        e.target.reset();
        setAnswer(initialAnswers);
        props.onSave(formData);
    };
    return (
        <div className={"add-question-modal-background" + (props.showModal ? "" : " d-none")}>
            <div className="add-question-modal">
                <form onSubmit={saveForm}>
                    <input name="question_id" type="hidden" value={props.currentQuestion ? props.currentQuestion.id : ""}/>
                    <input name="question_type" type="hidden" value={props.currentQuestion ? props.currentQuestion.type : ""}/>
                    <div className="add-question-modal-close" onClick={props.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <input name="question_text" className="question" type="text" required={true}
                               placeholder="Write your question here..."
                               defaultValue={props.currentQuestion ? props.currentQuestion.question_text : null}/>
                    </div>
                    {props.questionType !== 'text' ?
                        answersSection :
                        <input className="w-100 form-control border-bottom mt-3" type="text" placeholder="Text answer"
                               disabled={true}/>
                    }
                    <div>
                        <div>
                            <button className="btn btn-lg btn-primary mt-3">Save question</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditQuestion.propTypes = {
    questionType: PropTypes.oneOf(['single-choice', 'multiple-choice', 'text']).isRequired,
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    currentQuestion: PropTypes.object
};


export default EditQuestion;
