import React from 'react';

export default class MenuItems extends React.Component {

    render(){
        return (
            <React.Fragment>

                <li className="nav-item">
                    <button onClick={() => this.props.changePage('dashboard')} className="nav-link" style={{ background: 'none', color: 'white', border: 'none' }} >
                        Dashboard
                        <span className="sr-only">(página atual)</span>
                    </button>
                </li>
                <li className="nav-item dropdown">
                    <a href='/' className="nav-link dropdown-toggle" style={{ color: 'white' }} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Noticias
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button onClick={() => this.props.changePage('newsManagement')} className="dropdown-item">
                            Gerenciar
                        </button>
                        <button className="dropdown-item" onClick={() => this.props.changePage('addNews')}>
                            Adicionar
                        </button>
                        
                    </div>
                </li>

            </React.Fragment>
        );
    }
}