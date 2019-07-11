import React from 'react';
import axios from 'axios';

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
            search: this.props.match.params.search,
            news: [],
            currentPage: 0,
            totalPages: 0,
            loading: true
        }

        this.handlePagination = this.handlePagination.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        
        if(nextProps.match.params.search !== prevState.search) {
            
            return { loading: true, getNews: true, news: [], search: nextProps.match.params.search, currentPage: 0 };
        }

        return null;
    }

    handlePagination(event){

        this.setState({ getNews: true, currentPage: event.target.value - 1 });
    }

    async getNews(){

        try {

            let count, news;

            if(this.state.search){

                const response = await axios.get(`http://localhost:3001/api/news/search/${this.state.search}?limit=${this._itemsPerPage}&skip=${this.state.currentPage*this._itemsPerPage}`);
                
                news = response.data.result;
                
                count = response.data.count;

            } else {

                count = (await axios.get('http://localhost:3001/api/news/count')).data;

                news = (await axios.get(`http://localhost:3001/api/news?limit=${this._itemsPerPage}&skip=${this.state.currentPage*this._itemsPerPage}`)).data;  
                
                //count = count.data;

                //news = news.data;
            }

            this.setState({ loading: false, getNews: false, news, totalPages: Math.ceil(count/this._itemsPerPage) });
            
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

                <div className="container mb-3">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="row">

                                <If test={this.state.loading}>
                                    <LoadingSpinner />
                                </If>

                                <main className='ml-lg-5 d-flex'>
                                    <ul className="list-unstyled text-light mt-3">
                                        {this.renderRows()}
                                    </ul>
                                </main>
                                
                                
                            </div>
                            <div className="row justify-content-end mt-3" style={{ height: '50px' }}>

                                <PaginationNav
                                    totalPages={this.state.totalPages}
                                    currentPage={this.state.currentPage}
                                    limitPageNav={5}
                                    handlePagination={this.handlePagination}
                                />
                                
                            </div>
                        </div>

                        <div className="col-lg-3 ml-lg-4 m-0 p-0 mt-3">

                            <RightPanelPublic className='h-100 d-flex justify-content-center' />

                        </div>
                    </div>
                        
                </div>

            </PublicTemplate>
        );
    }
}