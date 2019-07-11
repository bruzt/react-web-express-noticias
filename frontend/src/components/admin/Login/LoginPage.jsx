import React from 'react';
import axios from 'axios';

import LoginPageOrAdminPage from './LoginPageOrAdminPage';
import AdminTemplate from '../template/AdminTemplate';
import If from '../../common/If';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            
            validToken: false,
            loginMode: true,
            keepConnected: false,
            errors: []
        }
    }
     
    handleChange(event) {

        let user = { ...this.state.user };

        switch(event.target.name){

            case 'name':

                user.name = event.target.value;
        
                this.setState({ user });
            break;

            case 'email':

                user.email = event.target.value;
        
                this.setState({ user });
            break;

            case 'password':

                user.password = event.target.value;
        
                this.setState({ user });
            break;

            case 'confirmPassword':

                user.confirmPassword = event.target.value;
        
                this.setState({ user });
            break;

            case 'keepConnected':

                this.setState({ ...this.state, keepConnected: event.target.checked });
            break;

            default:
            break;
            
        }
    }
     
    handleSubmit(event) {

        event.preventDefault();

        const user = { ...this.state.user, password: ''};

        this.setState({ user, errors: [] });

        (this.state.loginMode) ? this.login() : this.signup();
    }

    renderErrors(){

        return this.state.errors.map( (error, index) => {
            return (
                <div className="alert alert-danger" role="alert" key={index}>
                    {error}
                </div>
            );
        });
    }

    login() {
        
        return this.submit(`http://localhost:3001/api/auth`);

    }
    
    signup() {
    
        return this.submit(`http://localhost:3001/api/user`);
    }

    async submit(url) {

        try {

            let response = await  axios.post(url, this.state.user);

            if(this.state.keepConnected){

                localStorage.setItem('_userLogin', response.data);

            } else {

                sessionStorage.setItem('_userLogin', JSON.stringify(response.data));
            }

            this.setState({ validToken: true });
            
        } catch (error) {
            console.error(error);
            
            this.setState({ errors: error.response.data.errors });
        }
    }

    changeMode() {

        this.setState({ ...this.state, loginMode: !this.state.loginMode });
    }

    render(){
        
        if(this.state.validToken){

            return (<LoginPageOrAdminPage />);

        } else {

            return (
                <AdminTemplate>
                    <div id='home-login'>

                        <div className="container col-xl-4 col-lg-6 col-md-8 col-sm-10 col-xs-12" id="main-login">
                            <div className="card card-login card mt-5 mb-5">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <If test={(this.state.errors.length > 0)}>
                                            {this.renderErrors()}
                                        </If>
                                        <If test={! this.state.loginMode}>
                                            <div className="form-group">
                                                <label htmlFor="name">Nome</label>
                                                <input type="text" className='form-control' value={this.state.user.name} onChange={(event) => this.handleChange(event)} name='name' placeholder='Insira seu nome' />
                                            </div>
                                        </If>
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail</label>
                                            <input type="email" className='form-control' value={this.state.user.email} onChange={(event) => this.handleChange(event)} name='email' placeholder='Insira seu e-mail' />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Senha</label>
                                            <input type="password" className='form-control' value={this.state.user.password} onChange={(event) => this.handleChange(event)} name='password' placeholder='Insira sua senha' />
                                        </div>
                                        <If test={! this.state.loginMode}>
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirme a senha</label>
                                                <input type="password" className='form-control' value={this.state.user.confirmPassword} onChange={(event) => this.handleChange(event)} name='confirmPassword' placeholder='Confirme sua senha' />
                                            </div>
                                        </If>
                                        
                                        <If test={this.state.loginMode}>
                                            <div className="form-group">
                                                <div className="custom-control custom-switch">
                                                <input type="checkbox" className='custom-control-input' name='keepConnected' id='switchKeepConnected' onChange={(event) => this.handleChange(event)} />
                                                <label htmlFor='switchKeepConnected' className='custom-control-label'>Manter conectado</label>
                                                </div>
                                            </div>
                                        </If>
                                        <button type="submit" className="btn btn-primary btn-flat">
                                            {this.state.loginMode ? 'Entrar' : 'Registrar'}
                                        </button>
                                    </form>
                                    {/*
                                    <br />
                                    <a onClick={() => this.changeMode()}>
                                        {this.state.loginMode ? 'Novo usuário? Registrar aqui!' : 'Já é cadastrado? Entrar aqui!'}
                                    </a>
                                    */}
                                </div>
                            </div>
                        </div>

                    </div>
                </AdminTemplate>
            );
        }
    }
}

export default LoginPage;