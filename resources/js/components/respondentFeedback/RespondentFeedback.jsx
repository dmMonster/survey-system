import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import './feedback.css';

const RespondentFeedback = () => {

    const [rating, setRating] = useState(4);

    const [tmpRating, setTmpRating] = useState(0);

    const stars = () => {
        let stars = [];
        for (let i = 1; i <= 10; i++) {

            stars.push(
                <div key={i} onClick={() => {
                    setRating(i);
                }} onMouseEnter={() => {
                    setTmpRating(i)
                }}
                     onMouseLeave={() => {
                         setTmpRating(0);
                     }}>
                    <FontAwesomeIcon icon={faStar} className={
                        ' star ' + ((rating >= i) ? ' star-checked ' : null)
                        + (tmpRating >= i ? ' star-tmp ' : null)
                    }/>
                </div>
            )

        }
        return stars;
    };

    return (
        <div className="feedback-container">
            <h1>Thank you for your answers. You can rate the survey.</h1>
            <div className="stars-container">
                {stars()}
            </div>
            <div>
                 <textarea className="feedback-text" placeholder="additional remarks..."/>
            </div>
            <button className="btn btn-lg btn-primary m-3">Save</button>
        </div>
    );
};

export default RespondentFeedback;
