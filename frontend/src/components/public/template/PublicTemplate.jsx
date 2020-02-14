import React from 'react';

import './Template.css';

import Header from './Header';
import MenuPublic from '../navbar/MenuPublic';
import Footer from '../../common/Footer';

export default class PublicTemplate extends React.Component {

    render(){
        return (
            <React.Fragment>
                <div className='container-fluid'>

                    <Header login='true' />
                    <MenuPublic />

                </div>

                <div className="container">

                    {this.props.children}
                    
                </div>

                <div className='container-fluid p-0'>

                    <Footer />

                </div>
            </React.Fragment>
        );
    }
}