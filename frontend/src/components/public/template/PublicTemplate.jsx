import React from 'react';

import './Template.css';

import Header from './Header';
import MenuPublic from '../navbar/MenuPublic';
import Footer from '../../common/Footer';

export default class PublicTemplate extends React.Component {

    render(){
        return (
            <React.Fragment>

                <Header id='header-public' login='true' />
                <MenuPublic />

                {this.props.children}
                
                <Footer id='footer-public' />

            </React.Fragment>
        );
    }
}