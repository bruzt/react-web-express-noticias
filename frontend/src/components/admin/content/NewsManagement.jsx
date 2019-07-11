import React from 'react';
import axios from 'axios';
import moment from 'moment';

import PaginationNav from '../../common/PaginationNav';
import ConfirmModal from '../../common/ConfirmModal';

export default class NewsManagement extends React.Component {

    constructor(props){
        super(props);

        this._itensPerPage = 10;
        this._newsId = null;

        this.state = {
            getNews: true,
            news: [],
            totalPages: 0,
            currentPage: 0
        }

        this.handlePagination = this.handlePagination.bind(this);
        this.onConfirmDelete = this.onConfirmDelete.bind(this);
    }

    handlePagination(event){

        this.setState({ getNews: true, currentPage: event.target.value - 1 });
    }

   deleteButton(id){

        document.getElementById('confirmDelete').click(); 
    
        this._newsId = id;
   }

    async onConfirmDelete(){

        const token = JSON.parse(sessionStorage.getItem('_userLogin') || localStorage.getItem('_userLogin')).token;

        const bearerToken = "Bearer " + token;

        try {
            
            await axios.delete(`http://localhost:3001/api/news/${this._newsId}`, {
                headers: { 
                    authorization: bearerToken 
                }
            });

            this.setState({ getNews: true });
            
        } catch (error) {
            console.error(error);
        }
    }

    updateButton(){
        return;
    }


    async getNews(){

        try {
            
            const count = await axios.get('http://localhost:3001/api/news/count');
            
            const news = await axios.get(`http://localhost:3001/api/news?limit=${this._itensPerPage}&skip=${this.state.currentPage*this._itensPerPage}`);
            
            this.setState({ getNews: false, news: news.data, totalPages: Math.ceil(count.data/this._itensPerPage)});

        } catch (error) {
            console.error(error);
        }
    }

    renderRows(){

        return this.state.news.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{moment(item.createdAt).format('DD/MM/YYYY - HH:mm')}</td>
                    <td>
                        <button type='button' className='btn btn-warning mr-1' onClick={() => this.updateButton(item._id)}>
                            <i className='fa fa-pencil' />
                        </button>
                        <button type='button' className='btn btn-danger' onClick={() => this.deleteButton(item._id)}>
                            <i className='fa fa-trash-o' />
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render(){

        if(this.state.getNews) this.getNews();

        return (
            <React.Fragment>

                <ConfirmModal
                    id='confirmDelete'
                    text='Realmente deseja excluir?'
                    btnText='Excluir'
                    btnColor='danger'
                    onConfirm={this.onConfirmDelete}
                />                

                <div className="row w-100">
                    <div className="row w-100">

                        <h4 className='m-3'>Gerenciar noticias</h4>

                        <table className="table table-striped ml-3">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '65%' }}>Titulo</th>
                                    <th scope="col" style={{ width: '20%' }}>Data</th>
                                    <th scope="col" style={{ width: '15%' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.renderRows()}

                            </tbody>
                        </table>
                    </div>

                    <div className="row w-100 justify-content-end">
                        <PaginationNav 
                            currentPage={this.state.currentPage}
                            totalPages={this.state.totalPages}
                            limitPageNav={5}
                            handlePagination={this.handlePagination}
                        />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}