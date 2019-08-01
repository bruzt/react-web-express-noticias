import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactDisqusComments from 'react-disqus-comments';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';

import PublicTemplate from '../template/PublicTemplate';
import RightPanelPublic from '../rightPanel/RightPanelPublic';

export default class Newspage extends React.Component {

    constructor(props){
        super(props);

        document.title = this.props.match.params.title.split('-').join(' ');

        this.state = {
            news: {}
        }

        this.getNews();
    }

    getNews(){

        axios.get(`http://localhost:3001/api/news/${this.props.match.params.id}`)
        .then( (response) => {

            const news = response.data;

            this.setState({ news });

            document.title = news.title;
        });
    }
/*
    componentDidMount(){
        
        this.disqus();
    }

    disqus() {

        var disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = `${this.props.match.params.id}-${this.props.match.params.title}`;
        };

        (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://teste-oeqnydpmup.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }*/

    render(){
        return (
            <PublicTemplate>
                
                <div className="row">
                    <div className="col-lg-8">

                        <StyledMain>
                            
                                <div className="mt-3 text-light">
                                    <h1>{this.state.news.title}</h1>
                                    <small>enviado por {this.state.news.userId} em {moment(this.state.news.createdAt).format('DD/MM/YYYY - HH:mm')}</small>
                                    <br />
                                    <br />
                                    <img src={this.state.news.imgURL} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                    <br />
                                    <br />
                                    <div className='text-justify'>
                                        {draftToHtml(this.state.news.news)}
                                    </div>
        
                                    <small>Fonte: {this.state.news.sources}</small>
                                    <br />
                                    <br />
                                    <div className='py-1' style={{ borderTop: 'solid 1px', borderBottom: 'solid 1px', borderColor: 'white' }}>
                                        tags: {this.state.news.tags}
                                    </div>
                                </div>

                                {/*<div id="disqus_thread" className='mt-3'></div>*/}
                                
                                <ReactDisqusComments
                                    id='disqus_thread'
                                    className='mt-3'
                                    shortname="teste"
                                    identifier={`${this.props.match.params.id}-${this.props.match.params.title.split(' ').join('-')}`}
                                    title={this.state.news.title}
                                    url={window.location.href}
                                />
                                
                            
                        </StyledMain>
                    </div>
                    <StyledRightPanelCol className="col-lg-4">

                        <RightPanelPublic />
                        
                    </StyledRightPanelCol>
                </div>
                
            </PublicTemplate>
        );
    }
}

const StyledMain = styled.main`
    /*display: flex;*/
    margin: 0;

    /*@media (min-width: 1200px) {
        margin-left: 85px;
    }*/
`;

const StyledRightPanelCol = styled.div`
    padding: 0;
    margin: 10px 0 10px 0;

   /* @media (min-width: 1200px) {
        margin: 10px 80px 0 10px;
    }*/
`;