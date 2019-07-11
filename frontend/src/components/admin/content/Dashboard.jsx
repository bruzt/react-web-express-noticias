import React from 'react';
import axios from 'axios';

export default class Dashboard extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            getCount: true,
            count: 0
        }
    }

    getNewsCount(){

        axios.get(`http://localhost:3001/api/news/count`)
        .then( (response) => {
            
            this.setState({ count: response.data, getCount: false });
        });
    }

    render(){

        if(this.state.getCount) this.getNewsCount();

        return (
            <div className="card-deck mt-3">
                <button className='p-0' style={{ border: 'none', background: 'none' }}>
                    <div className="card text-white bg-info m-0" style={{ maxWidth: '18rem' }}>
                        
                        <div className="card-header">
                            Noticias
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                {this.state.count} noticias cadastradas
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        );
    }
}