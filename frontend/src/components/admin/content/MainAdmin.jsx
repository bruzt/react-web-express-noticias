import React from 'react';

import If from '../../common/If';
import Dashboard from './Dashboard';
import NewsManagement from './NewsManagement';
import AddNews from './AddNews';

class MainAdmin extends React.Component {

    render(){

        return (
            
            <main className='col-lg-10 col-md-11' id='main-admin' style={{ minHeight: '400px' }}>
                <div className="container d-flex">

                    <If test={this.props.page === 'dashboard'}>
                        <Dashboard />
                    </If>

                    <If test={this.props.page === 'newsManagement'}>
                        <NewsManagement />
                    </If>

                    <If test={this.props.page === 'addNews'}>
                        <AddNews />
                    </If>

                </div>
            </main>
            
        );
    }
}

export default MainAdmin;