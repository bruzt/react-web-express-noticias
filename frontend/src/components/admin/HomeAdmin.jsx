import React from 'react';

import MenuAdmin from './menus/MenuAdmin';
import AdminTemplate from './template/AdminTemplate';
import MainAdmin from './content/MainAdmin';

class AdminHome extends React.Component {

    constructor(props){
        super(props);

        document.title = 'React Admin';

        this.state = {
            page: 'dashboard'
        }

        this.changePage = this.changePage.bind(this);
    }

    changePage(page){

        this.setState({ page });
    }

    render() {
        return (
            <AdminTemplate logout='true'>

                <div className="container-fluid bg-dark">
                    <div className="row" style={{ marginRight: '-45px' }}>
                        <MenuAdmin changePage={this.changePage} />
                        <MainAdmin page={this.state.page} />
                    </div>
                </div>

            </AdminTemplate>    
        );
    }
}

export default AdminHome;