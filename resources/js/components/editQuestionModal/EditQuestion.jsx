import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './editQuestion.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

EditQuestion.propTypes = {
    questionType: PropTypes.oneOf(['single-choice', 'multiple-choice', 'text']).isRequired,
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

function EditQuestion(props) {

    const initialAnswers = [
        {answer_id: 1},
        {answer_id: 2},
    ];

    const [answers, setAnswer] = useState(initialAnswers);

    const answerList = answers.map((val) => {
        return (
            <div key={val.answer_id} className="d-flex align-items-center">
                <input name={"answer"} className="answer" type="text"
                       defaultValue="Answer..." onFocus={(e) => {
                    e.target.select()
                }}/>
                <div style={{cursor: "pointer"}} onClick={() => deleteAnswer(val.answer_id)}>
                    <FontAwesomeIcon icon={faTrash} color={"#df5252"} size={"2x"}/>
                </div>
            </div>
        )

    });

    const addAnswer = (e) => {
        e.preventDefault();
        setAnswer(
            [...answers, {answer_id: (new Date().getTime()), answer_text: "Answer..."}]
        )
    };

    function deleteAnswer(answerId) {
        let newAnswers = [];
        for (let answer of answers) {
            if (answer.answer_id !== answerId) {
                newAnswers.push(answer);
            }
        }
        setAnswer(newAnswers);
    }

    const answersSection = (
        <div className="answers">
            <div>

                {answerList}

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
                    <div className="add-question-modal-close" onClick={props.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <input name="question_text" className="question" type="text" required={true}
                               placeholder="Your question..."/>
                    </div>
                    {props.questionType !== 'text' ? answersSection :
                        <input className="w-100 form-control border-bottom mt-3" type="text" placeholder="Text answer"
                               disabled={true}/>}
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

export default EditQuestion;
