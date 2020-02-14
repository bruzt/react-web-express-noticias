import React from 'react';

class Footer extends React.Component {

    render(){
        return (
         
                <div className="row m-0 p-0">
                    <footer {...this.props} className='col d-flex bg-dark' style={{ height: '100px', border: 'solid 1px', borderTopColor: 'white' }}>
                        RODAPÉ
                    </footer>
                </div>
            
        );
    }
}

export default Footer;