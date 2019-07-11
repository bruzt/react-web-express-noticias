import React from 'react';

import MenuItems from './MenuItems';

class MenuAdmin extends React.Component {

    render(){
        return (
            <React.Fragment>

                {/* Menu lateral */}
                <ul className='nav flex-column d-lg-flex d-none mt-3 text-dark' style={{ width: '200px', textDecoration: 'none'}}>
                    <MenuItems changePage={this.props.changePage} />
                </ul>

                {/* Menu topo */}
                <nav className='navbar col-lg-2 navbar-expand-lg d-lg-none d-flex navbar-dark' id='menu-admin'>
                    <div className="navbar-brand" ></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                        <ul className="navbar-nav mr-auto">
                            <MenuItems changePage={this.props.changePage} />
                        </ul>
                    </div>
                </nav>

            </React.Fragment>
        );
    }
}

export default MenuAdmin;