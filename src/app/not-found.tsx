'use client'

import './index.scss';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-text-wrapper">
                <div className="text">
                    <h1>Page Not Found!</h1>
                    <h2>Please check the URL or contact the owner.</h2>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
