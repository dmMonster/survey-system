import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header/Header.jsx";
import FeatureList from "./featureList/FeatureList";

function RootComponent() {
    return (
        <div className="container-fluid">
            <Header />
            <FeatureList/>
        </div>
    );
}

export default RootComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<RootComponent />, document.getElementById('app'));
}
