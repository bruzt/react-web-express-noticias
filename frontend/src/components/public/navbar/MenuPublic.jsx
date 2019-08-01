import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class MenuPublic extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            search: ''
        }
    }

    handleChange(event){

        switch(event.target.name){

            case 'search':

                this.setState({ search: event.target.value });
            break;

            default:
            break;
        }
    }

    handleInputEnterKey(event){
        
        if(event.key === 'Enter') { 

            event.preventDefault();
            
            document.getElementById('searchButton').click()
        }
    }

    render(){
        return (
            <div className="row">
                <StyledNav className='col navbar navbar-expand-lg navbar-light bg-light'>
                    <Link to="/" className='navbar-brand'></Link>
                    <button className="navbar-toggler" type='button' data-toggle='collapse' data-target='#menu' aria-controls='menu' aria-expanded='false' aria-label='menu colapso'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div id="menu" className='collapse navbar-collapse'>
                        <ul className='navbar-nav mx-auto'>
                            {/* menus */}
                            <li className='nav-item mr-3'>
                                <Link to="/busca/playstation" className='nav-link font-weight-bold sombra px-4'>
                                    Playstation
                                </Link>
                            </li>
                            <li className='nav-item mr-3'>
                                <Link to="/busca/xbox" className='nav-link font-weight-bold sombra px-4'>
                                    Xbox
                                </Link>
                            </li>
                            <li className='nav-item mr-3'>
                                <Link to="/busca/nintendo" className='nav-link font-weight-bold sombra px-4'>
                                    Nitendo
                                </Link>
                            </li>
                            <li className="nav-item dropdown mr-3">
                                <a href='/' className="nav-link dropdown-toggle font-weight-bold sombra px-4" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    PC
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/busca/pc">Geral</Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/busca/amd">AMD</Link>
                                    <Link className="dropdown-item" to="/busca/intel">Intel</Link>
                                    <Link className="dropdown-item" to="/busca/nvidia">NVidia</Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/busca/windows">Windows</Link>
                                    <Link className="dropdown-item" to="/busca/linux">Linux</Link>
                                    <Link className="dropdown-item" to="/busca/macos">macOS</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown mr-3">
                                <a href='/' className="nav-link dropdown-toggle font-weight-bold sombra px-4" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Mobile
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/busca/mobile">Geral</Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/busca/android">Android</Link>
                                    <Link className="dropdown-item" to="/busca/ios">iOS</Link>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <div className="input-group">
                                <input className="form-control" type='text' name='search' onChange={(event) => this.handleChange(event)} value={this.state.search} onKeyDown={(event) => this.handleInputEnterKey(event)} placeholder="Pesquisar" aria-label="Pesquisar" />
                                <div className="input-group-append">
                                    <Link to={`/busca/${this.state.search}`} className="btn btn-info my-2 my-sm-0 input-group-btn" type="button" id='searchButton'>Pesquisar</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </StyledNav>
            </div>
        );
    }
}

const StyledNav = styled.nav`
    display: flex;

    /*@media (min-width: 1200px) {
        margin: 0 85px 0 85px;
    }*/
`;