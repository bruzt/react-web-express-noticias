import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import PublicTemplate from './template/PublicTemplate';
import RightPanelPublic from './rightPanel/RightPanelPublic';
import NewsListItem from './content/NewsListItem';
import PaginationNav from '../common/PaginationNav';
import If from '../common/If';
import LoadingSpinner from '../common/LoadingSpinner';

export default class HomeOrSearch extends React.Component {

    constructor(props){
        super(props);

        document.title = 'Site Home';

        this._itemsPerPage = 10;

        this.state = {
            getNews: true,
            news: [],
            currentPage: 0,
            totalPages: 0
        }
    }

    componentDidUpdate(prevProps){

        if(prevProps.match.params.search !== this.props.match.params.search){

            this.setState({ getNews: true, news: [], currentPage: 0 });
        }
    }

    handlePagination(event){

        this.setState({ getNews: true, currentPage: event.target.value - 1 });
    }

    async getNews(){

        try {

            let count, news;

            if(this.props.match.params.search){

                const response = await axios.get(`http://localhost:3001/api/news/search/${this.props.match.params.search}?limit=${this._itemsPerPage}&skip=${this.state.currentPage*this._itemsPerPage}`);
                
                news = response.data.result;
                
                count = response.data.count;

            } else {

                count = (await axios.get('http://localhost:3001/api/news/count')).data;

                news = (await axios.get(`http://localhost:3001/api/news?limit=${this._itemsPerPage}&skip=${this.state.currentPage*this._itemsPerPage}`)).data;  
            
            }

            this.setState({ getNews: false, news, totalPages: Math.ceil(count/this._itemsPerPage) });
            
        } catch (error) {
            
            console.log(error);
        }
    }

    renderRows(){

        if(this.state.news.length > 0) {

            return this.state.news.map( (row, index) => {
                return (
                    <NewsListItem row={row} key={index} />
                );
            });

        } else if(this.state.getNews === false) {

            return (
                <h3>Nada encontrado!</h3>
            );

        } else {
            return false;
        }
    }

    render(){

        if(this.state.getNews) this.getNews();

        return (
            <PublicTemplate>

                <div className="row">

                    <div className="col-lg-8">

                        <If test={this.state.getNews}>
                            <LoadingSpinner />
                        </If>

                        <div className="row">
                        
                            <StyledMain>
                                <ul className="list-unstyled text-light">
                                    {this.renderRows()}
                                </ul>
                            </StyledMain>
                            
                            
                        </div>
                        <StyledPaginationRow className="row">

                            <PaginationNav
                                totalPages={this.state.totalPages}
                                currentPage={this.state.currentPage}
                                limitPageNav={5}
                                handlePagination={this.handlePagination.bind(this)}
                            />
                            
                        </StyledPaginationRow>
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
    display: flex;
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

const StyledPaginationRow = styled.div`
    height: 50px;
    margin: 10px 10px 10px 0;
    justify-content: end;
`;