import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logoImg from '../../../assets/img/logo-200x100.jpg';

export default class Header extends React.Component {

    render(){
        
        return (
            <div className="row">
                <div className='col p-0'>
                    <StyledHeader {...this.props}>
                        <div className="col p-0">
                            <nav className="navbar p-0">
                                <Link to={"/"} className='nav-brand'>
                                    <img src={logoImg} alt="logo-img" />
                                </Link>
                            </nav>
                        </div>

                        <div className='col d-md-flex d-none justify-content-center'>
                                
                        </div>

                        <div className="col">
                            <StyledLink to='/admin' className='btn'>
                                <i className="fa fa-gear" />
                            </StyledLink>       
                        </div>  
                    </StyledHeader>
                </div>
            </div>
        );
    }
}

const StyledHeader = styled.header`
    display: none;
    height: 100px;
    padding: 0;
    background: linear-gradient(131.26deg, rgb(163, 23, 23) 30%, black 100%);
    
    @media (min-width: 768px) {
        display: flex;
    }
    /*@media (min-width: 1200px) {
        margin: 0 100px 0 100px;
    }*/
`;

const StyledLink = styled(Link)`
    position: absolute;
    bottom: 1px;
    right: 1px;
`;