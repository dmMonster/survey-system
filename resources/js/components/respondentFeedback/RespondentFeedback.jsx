import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import './feedback.css';
import {surveyService} from "../../_services/surveyService";
import {useParams} from "react-router-dom";

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
                        ' star ' + ((rating >= i) ? ' star-checked ' : undefined)
                        + (tmpRating >= i ? ' star-tmp ' : undefined)
                    }/>
                </div>
            )

        }
        return stars;
    };

    const [description, setDescription] = useState('');

    const [ratingSaved, setRatingSaved] = useState(false);
    const {token} = useParams();
    const saveRating = () => {
        surveyService.saveRating(token, rating, description).subscribe({
            next() {
                setRatingSaved(true);
            },
            error(error) {
                alert(error.response.data.message);
            }
        })
    };

    return (
        <div className="feedback-container">
            <div className={ratingSaved ? 'd-none' : undefined}>
                <h1>Thank you for your answers. You can rate the survey.</h1>
                <div className="stars-container">
                    {stars()}
                </div>
                <div>
                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} className="feedback-text" placeholder="additional remarks..."/>
                </div>
                <button onClick={saveRating} className="btn btn-lg btn-primary m-3">Save</button>
            </div>
            <div className={!ratingSaved ? 'd-none' : undefined}>
                <h1>Thank you</h1>
            </div>
        </div>
    );
};

export default RespondentFeedback;
