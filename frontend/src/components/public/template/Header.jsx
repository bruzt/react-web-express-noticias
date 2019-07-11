import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/img/logo-200x100.jpg';

export default class Header extends React.Component {

    render(){
        return (
            <div className="container">
                <div className="row">
                    <header {...this.props} className='col d-sm-flex d-none p-0 mx-lg-5' style={{ height: '100px' }}>
                        <div className="col p-0">
                            <nav className="navbar p-0" /*style={{ position: 'absolute', top: '1px', left: '1px' }}*/>
                                <Link to={"/"} className='nav-brand order-1'>
                                    <img src={logoImg} alt="logo-img" />
                                </Link>
                            </nav>
                        </div>

                        <div className='col d-md-flex d-none justify-content-center'>
                                
                        </div>

                        <div className="col">
                            <Link to='/admin' className='btn' style={{ position: 'absolute', bottom: '1px', right: '1px' }}>
                                <i className="fa fa-gear" />
                            </Link>       
                        </div>  
                    </header>
                </div>
            </div>
        );
    }
}