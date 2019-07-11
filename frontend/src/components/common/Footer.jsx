import React from 'react';

class Footer extends React.Component {

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <footer {...this.props} className='col d-flex bg-dark' style={{ height: '100px', border: 'solid 1px', borderTopColor: 'white' }}>
                        RODAPÉ
                    </footer>
                </div>
            </div>
        );
    }
}

export default Footer;