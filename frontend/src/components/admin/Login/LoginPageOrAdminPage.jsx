import React from 'react';
import axios from 'axios';

import HomeAdmin from '../HomeAdmin';
import LoginPage from './LoginPage';

class LoginPageOrAdminPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            auth: {
                user: JSON.parse(sessionStorage.getItem('_userLogin')) || JSON.parse(localStorage.getItem('_userLogin')),
                validToken: false
            }
        }

        this.init();
    }

    init(){

        if(this.state.auth.user){
            
            this.validateToken(this.state.auth.user.token);
        }
    }

    async validateToken(token) {

        if (token) {

            try {

                let response = await axios.post(`http://localhost:3001/api/validateToken`, { token });

                if (response) {

                    this.setState({ auth: { ...this.state.auth, validToken: true }});
    
                } else {
    
                    localStorage.removeItem('_userLogin');
    
                    this.setState({ auth: { user: null, validToken: false }});
                }

            } catch (error) {
                console.error(error);
            }
        }
    }

    render(){

        if(this.state.auth.user && this.state.auth.validToken) {

            axios.defaults.headers.common['authorization'] = this.state.auth.user.token;

            return (
                <HomeAdmin />
            );

        } else if(! this.state.auth.user && ! this.state.auth.validToken){

            return <LoginPage />

        } else {
            return false;
        }
    }
}

export default LoginPageOrAdminPage;