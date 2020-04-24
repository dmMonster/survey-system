import React, {useRef} from 'react';
import './collectAnswers.css';
import {useParams} from 'react-router-dom';

function CollectAnswers() {
    let {token} = useParams();

    const link = useRef(null);
    const copyLink = () => {
        link.current.select();
        document.execCommand("copy");
    };

    return (
        <div className="container">
            <h2 className="text-center m-3">
                Collect responses
            </h2>
            <div className="link-box">
                <h5>Copy and send this link to your respondents:</h5>

                <div className="link">
                    <div className="flex-grow-1">
                        <input type="text" readOnly={true} ref={link}
                               value={location.hostname + (location.port && ":" + location.port) + "/survey/solve/" + token}/>
                    </div>
                    <div>
                        <button onClick={copyLink} className="btn-copy-link">Copy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollectAnswers;
