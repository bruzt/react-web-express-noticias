import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/img/logo-200x100.jpg';

import If from '../../common/If';

export default class Header extends React.Component {

    logOut(){

        sessionStorage.removeItem('_userLogin');
        localStorage.removeItem('_userLogin');

        window.location.reload();
    }

    render(){
        return (
            <div className="container-fluid p-0" style={{ border: '1px solid green' }}>
                <div className="row">
                    <header {...this.props} className='col d-sm-flex d-none' style={{ height: '100px' }}>
                        <div className="col p-0">
                            <nav className="navbar p-0" /*style={{ position: 'absolute', top: '1px', left: '1px' }}*/>
                                <Link to={"/"} className='nav-brand order-1'>
                                    <img src={logoImg} alt="logo-img" />
                                </Link>
                            </nav>
                        </div>

                        <div className='col d-md-flex d-none justify-content-center'>
                                
                        </div>
                        <If test={this.props.logout}>
                            <div className="col">
                                <button type='button' className='btn order-1' onClick={() => this.logOut()} style={{ position: 'absolute', bottom: '1px', right: '1px' }}>
                                    Logout <i className="fa fa-sign-out" />
                                </button>
                            </div> 
                        </If>
                    </header>
                </div>
            </div>
        );
    }
}