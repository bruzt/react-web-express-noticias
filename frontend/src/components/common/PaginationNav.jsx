import React from 'react';

export default class PaginationNav extends React.Component {

    renderPagination(){
        
        let page = [];
        let pageNumberStart = 0;
        let pageNumberEnd = 0;
        let limitPageNav = this.props.limitPageNav

        if(this.props.totalPages < this.props.limitPageNav){
            limitPageNav = this.props.totalPages
        }

        // estamos nas primeiras paginas
        if((this.props.currentPage - parseInt(limitPageNav / 2)) < 1){
            pageNumberStart = 0;
            pageNumberEnd = limitPageNav;

        // estamos nas ultimas paginas
        } else if((this.props.currentPage + parseInt(limitPageNav / 2)) >= this.props.totalPages){
            pageNumberStart = this.props.totalPages - limitPageNav;
            pageNumberEnd = this.props.totalPages;

        // nem perto do começo nem perto do fim
        } else {
            pageNumberStart = this.props.currentPage - parseInt(limitPageNav / 2);
            pageNumberEnd = this.props.currentPage + parseInt(limitPageNav / 2) + 1;

            if(pageNumberEnd > this.props.totalPages) pageNumberEnd--;
        }

        for(let i = pageNumberStart; i <= pageNumberEnd -1; i++) {
            page.push(
                <li className={`page-item ${(this.props.currentPage === i) ? 'active' : ''}`} key={i}>
                    <button type='button' className="page-link" value={i+1} onClick={this.props.handlePagination}>
                        {i+1}
                    </button>
                </li>
            );
        }

        return page;
    }

    render(){
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    
                    {/*
                    <li className={`page-item ${(this.props.currentPage === 0) ? 'disabled' : ''}`}>
                        <button type='button' className="page-link" aria-label="Previous" value={this.props.currentPage} onClick={this.props.handlePagination}>  
                        
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    */}
                    
                    {this.renderPagination()}

                    {/*
                    <li className={`page-item ${(this.props.currentPage === this.props.totalPages-1) ? 'disabled' : ''}`}>
                        <button type='button' className="page-link" aria-label="Next" value={this.props.currentPage+2} onClick={this.props.handlePagination}>
                        
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                    */}

                    &nbsp;

                    <li className='page-item disabled'>
                        <button type='button' className="page-link">
                            Total: {this.props.totalPages}
                        </button>
                    </li>
                
                </ul>
            </nav>
        );
    }
}