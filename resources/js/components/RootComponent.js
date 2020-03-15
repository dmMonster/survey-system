import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header/Header.jsx";

function RootComponent() {
    return (
        <div className="container-fluid">
            <Header />
        </div>
    );
}

export default RootComponent;

if (document.getElementById('app')) {
    ReactDOM.render(<RootComponent />, document.getElementById('app'));
}
