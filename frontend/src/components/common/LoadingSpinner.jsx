import React from 'react';
import styled from 'styled-components';

export default class LoadingSpinner extends React.Component {
    
    render(){
        return (
            <StyledDiv>
                <div className="spinner-border text-white" role="status" style={{ width: '5rem', height: '5rem' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </StyledDiv>
        );
    }
}

const StyledDiv = styled.div`
    position: absolute;
    right: 50%;
    top: 25%;
`;