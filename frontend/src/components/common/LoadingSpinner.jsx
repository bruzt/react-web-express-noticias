import React from 'react';

export default class LoadingSpinner extends React.Component {
    
    render(){
        return (
            <div style={{ position: 'absolute', right: '35%', top: '25%' }}>
                <div className="spinner-border text-white" role="status" style={{ width: '5rem', height: '5rem' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}