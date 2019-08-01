import React from 'react';
import styled from 'styled-components';

export default class LeftPanelPublic extends React.Component {

    render(){
        return (
            <StyledDiv {...this.props}>
                PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br /> PAINEL DIREITO <br />
            </StyledDiv>
        );
    }
}

const StyledDiv = styled.div`
    border: solid 2px forestgreen;
    display: flex;
    min-height: 720px;
    height: 100%;
    justify-content: center;
`;