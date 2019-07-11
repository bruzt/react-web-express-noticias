import React from 'react';

import './AdminTemplate.css';

import AdminHeader from './AdminHeader';
//import Header from '../../common/Header';
//import MenuAdmin from './MenuAdmin';
import Footer from '../../common/Footer';

export default class PublicTemplate extends React.Component {

    render(){
        return (
            <React.Fragment>

                <AdminHeader id='header-admin' logout={this.props.logout} />
                {this.props.children}
                <Footer id='footer-public' />

            </React.Fragment>
        );
    }
}