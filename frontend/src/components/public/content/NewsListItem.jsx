import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw } from 'draft-js';

export default class NewsListItem extends React.Component {

    render(){
        return (
            <li className="media sombra d-flex p-0 p-md-1 mr-2 mr-md-0 mt-2" style={{ height: '155px' }}>

                <div className='w-25' /*style={{ width: '200px' }}*/>
                    <Link to={`/noticias/${this.props.row._id}/${this.props.row.title.split(' ').join('-')}`} >
                        <img className="d-none d-md-block pr-2 mt-3" src={this.props.row.imgURL} alt="" style={{ maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto' }} />
                    </Link>
                </div>
                
                <div className="w-100 ml-lg-4 ml-n5">
                    <div className="media-body">
                        <div className="container">
                            <div className="row" style={{ height: '30px', overflow: 'hidden' }}>
                                <h5 className="mt-0 mb-1">
                                    <Link to={`/noticias/${this.props.row._id}/${this.props.row.title.split(' ').join('-')}`} style={{ textDecoration: 'none', color: 'red' }}>
                                        {this.props.row.title}
                                    </Link>
                                </h5>
                            </div>
                            <div className="row" style={{ height: '100px', overflow: 'hidden' }}>
                                <div className='text-justify text-muted mt-1'>
                                    {draftToHtml(this.props.row.news)}
                                </div>
                            </div>
                            <div className="row" style={{ height: '20px', backgroundColor: 'grey' }}>
                                <small>
                                    &nbsp;{moment(this.props.row.createdAt).format('DD/MM/YYYY - HH:mm')} 
                                    <Link to={`noticias/${this.props.row._id}/${this.props.row.title}#disqus_thread`} style={{ textDecoration: 'none', color: 'red', position: 'absolute', right: '20px' }}>
                                        Comente
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                
            </li>
        );
    }
}