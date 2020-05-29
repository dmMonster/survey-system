import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DownloadCsv = props => {
    const link = useRef(null);

    const prepareFile = () => {
        let questions_text = ["QUESTION"];
        let answers = ["ANSWER"];
        let answersCounter = ["Number of Answers"];

        for (let i = 0; i < props.questions.length; i++) {
            for (let j = 0; j < props.questions[i].answers.length; j++) {
                questions_text.push(props.questions[i]['question_text']);
                answers.push(props.questions[i].answers[j]['answer_text']);
                answersCounter.push(props.questions[i].answers[j]['given_answers_count']);
            }
        }

        const rows = [
            questions_text,
            answers,
            answersCounter
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(e => e.join(";")).join("\n");

        let encodedUri = encodeURI(csvContent);
        link.current.setAttribute("href", encodedUri);
        link.current.setAttribute("download", props.fileName + ".csv");
        link.current.click();
    };

    return (
        <div>
            <div style={{'cursor': 'pointer'}} className="d-inline" onClick={prepareFile}>
                <FontAwesomeIcon icon={faFileCsv} size={'2x'} color={'#00970e'}/>
            </div>
            <a className="invisible" ref={link} href="" download>Download my painting</a>
        </div>
    );
};

DownloadCsv.propTypes = {
    fileName: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired
};

export default DownloadCsv;
