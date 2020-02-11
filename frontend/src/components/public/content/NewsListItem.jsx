import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

export default class NewsListItem extends React.Component {

   

    componentDidMount(){
       
        document.getElementById('content-box').innerHTML = this.props.row.news;
    }

    render(){
        return (
            
            <StyledLi className="media sombra">

                <StyledImgWrapper>
                    <Link to={`/noticias/${this.props.row._id}/${this.props.row.title.split(' ').join('-')}`} >
                        <StyledImg src={this.props.row.imgURL} alt="" />
                    </Link>
                </StyledImgWrapper>
                
                <StyledMediaBody>
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
                                <div id='content-box' className='text-justify text-muted mt-1'>
                                   
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
                </StyledMediaBody>
                
            </StyledLi>
        );
    }
}

const StyledLi = styled.li`
    display: flex;
    height: 155px;
    width: 750px;
    padding: 0;
    margin: 10px 10px 0 0;
`;

const StyledImgWrapper = styled.div`
    width: 25%;

    @media (max-width: 992px) {
        display: none;
        width: 0;
    }
`;

const StyledImg = styled.img`
    max-width: 200px;
    max-height: 150px;
    width: auto;
    height: auto;
    padding-right: 5px;
    margin-top: 5px;

    @media (max-width: 992px) {
        display: none;
    }
`;

const StyledMediaBody = styled.div`
    width: 100%;
    padding-right: 5px;

    /*@media (min-width: 1200px) {

        
    }*/
`;