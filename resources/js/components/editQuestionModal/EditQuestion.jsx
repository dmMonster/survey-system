import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './editQuestion.css';

EditQuestion.propTypes = {
    questionType: PropTypes.oneOf(['single-choice', 'multi-choice', 'text-answer']).isRequired,
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

function EditQuestion(props) {

    const [answers, setAnswer] = useState([
        {answer_id: 1, answer_text: "Answer 1..."},
        {answer_id: 2, answer_text: "Answer 2..."}
    ]);

    const answerList = answers.map((val) => {
        return <input key={val.answer_id} className="answer" type="text" defaultValue={val.answer_text}/>
    });

    const addAnswer = (e) => {
        e.preventDefault();
        setAnswer(
            [...answers, {answer_id: answers.length + 1, answer_text: "Answer " + (answers.length + 1) + "..."}]
            //TODO unique id
        )
    };
    const answersSection = (
        <div className="answers">
            <div>
                {answerList}

                <button className="btn btn-outline-info" onClick={addAnswer}>Add answer</button>
            </div>
        </div>
    );
    return (
        <div className={"add-question-modal-background" + (props.showModal ? "" : " d-none")}>
            <div className="add-question-modal">
                <form onSubmit={props.onSave}>
                    <div className="add-question-modal-close" onClick={props.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div>
                        <input className="question" type="text" placeholder="Question..."/>
                    </div>
                    {props.questionType !== 'text-answer' && answersSection}
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
